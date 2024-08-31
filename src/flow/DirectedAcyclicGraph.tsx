import React, {useCallback, useMemo, useRef, useState} from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
    ReactFlow,
    Controls,
    Background,
    type Node,
    type Edge,
    applyEdgeChanges,
    applyNodeChanges,
    NodeChange,
    EdgeChange,
    OnNodesChange,
    OnEdgesChange,
    addEdge,
    OnConnect,
    ControlButton,
    BackgroundVariant,
    Connection,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import CustomActivityNode from "./CustomActivityNode";
import {Button} from "@mui/material";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;

const customActNode = {
    customActivityNode: CustomActivityNode,
}

function DirectedAcyclicGraph(props: any) {
    /* Register any custom nodes here */
    const nodeTypes = useMemo(() => (customActNode), []);

    /* Stores the node and edge states */
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    /* Update the node and edge state on change */
    const onNodesChange: OnNodesChange = useCallback(
        (changes: NodeChange<Node<Record<string, unknown>, string>>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes: EdgeChange<Edge<Record<string, unknown>, string | undefined>>[]) =>
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    /* Responsible for establishing connections between nodes*/
    const onConnect: OnConnect = useCallback(
        (params: Connection) => {
            return setEdges((eds) => {
                return addEdge({...params,
                    type: 'step',
                    style: {
                        strokeWidth: 2,
                        stroke: 'red',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 10,
                        height: 10,
                        color: 'red',
                    },
                }, eds)
            })
        },
        [setEdges],
    );

    /* Add Activity Button */
    let addActivityBtn: ReactJSXElement = (
            <ControlButton onClick={() => {addActivityNode()}}>
                <AddCircleIcon />
            </ControlButton>
    );

    /* Generate Workflow button */
    let generateWorkflowButton: ReactJSXElement = (
        <Button variant="outlined" startIcon={<DirectionsWalkIcon/>} onClick={() => {generateDag()}}>
            Generate Workflow
        </Button>
    );


    /* Track the y-axis of the React flow workspace*/
    const yPos = useRef(0);

    /**
     * On click of add activity button, adds a new custom node to the DAG
     */
    const addActivityNode = useCallback(() => {
        yPos.current += 200;
        let activityId = (++id).toString();
        let newNode = {
                id: activityId,
                position: {x: 20, y: yPos.current + 50},
                type: 'customActivityNode',
                data: {label: 'Activity', onDeleteNodeButtonClick: (nodeId: string) => deleteActivityNodeById(nodeId)},
                resizing: true,
                deletable: true,
                selectable: true,
            } as Node;

        let clonedNodes:Node[] = [...nodes];
        clonedNodes.push(newNode);
        setNodes(clonedNodes)
    }, [nodes]);

    /**
     * Delete the node by ID
     * @param id
     */
    const deleteActivityNodeById = (id: String) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }

    /**
     * TODO:: When user clicks on the Generate DAG. Get the current node and edge state and generate the payload to be sent to backend for further processing
     */
    function generateDag() {
        console.log(nodes);
        console.log(edges);
    }

    return (
        <>
            <div className="flowContainer">
                <div style={{padding: '5%', height: '500px', width: '80%'}}>
                    {/*React flow component*/}
                    <ReactFlow
                        nodeTypes={nodeTypes}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        snapGrid={[10, 10]}
                    >
                        <Background color="darkblue" variant={BackgroundVariant.Dots}/>
                        <Controls>
                            {addActivityBtn}
                        </Controls>
                    </ReactFlow>

                    <div style={{paddingTop: '25px'}}>
                        {generateWorkflowButton}
                    </div>

                </div>
            </div>
        </>

    );
}

export default DirectedAcyclicGraph;