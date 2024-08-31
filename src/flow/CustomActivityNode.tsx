import React, {useEffect, useState} from 'react';
import {Handle, Position, NodeProps, Node, ControlButton} from "@xyflow/react";
import {Button, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import AddIcon from '@mui/icons-material/Add';
import AddDetailsDialog from "./addDetails/AddDetailsDialog";
import axios from "axios";

    /* Type definition of the custom activity node */
    export type customActivityNode = Node<
    {
        label: string;
        activityType: string;
        onDeleteNodeButtonClick: (nodeId: string) => void;
    },
    'activityNode'>;

/**
 * CustomActivityNode component.
 * @param data -> The destructured data prop of this component. onDeleteNodeButtonClick prop triggers the delete function in Parent.
 * @param id -> Node ID
 * @constructor
 */
function CustomActivityNode({data, id}: NodeProps<customActivityNode>) {
    let [selection, setSelection] = useState('');
    let [dialogOpenState, setDialogOpenState] = useState(false);
    let [activitiesList, setActivitiesList] = useState<string[]>([]);

    /* Dynamically generate activity list from the Schema definition */
    useEffect(() => {
        (async function fetchSchema(){
            let schema = await axios.get('formSchemaDefinition.json');
            setActivitiesList(Object.keys(schema.data.controlSchema) as string[]);
        })();
    }, []);

    /* Set the selected activity. Adds the selection to data prop passed up to parent */
    const onselectionchange = (e: any) => {
        setSelection(e.target.value);
        data.activityType = (e.target.value);
    }

    /* On click, open additional details dialog */
    const addActivityDetailsBtn: ReactJSXElement = (
        <Button size={'small'} variant="outlined" style={{color: "white", backgroundColor:'darkblue'}} startIcon={<AddIcon/>} onClick={() => setDialogOpenState(true)}>
            Details
        </Button>
    );

    return (
        <>
            <div style={{backgroundColor:'darkgray', paddingLeft: '20px', paddingBottom: '20px', paddingRight: '5px'}}>
                <InputLabel style={{fontSize: '12px'}}>{`${data.label}`}</InputLabel>
                <div style={{display: "flex", flexDirection:"row"}}>
                    <Select style={{padding: '0px', width: '250px', backgroundColor: 'white'}}
                            className="nodrag nopan"
                            id="activity-select"
                            value={selection}
                            label="Age"
                            onChange={onselectionchange}
                    >
                        {activitiesList.map((activity) => (<MenuItem style={{fontSize: '12px'}} key={activity} value={activity}>{activity}</MenuItem>))}
                    </Select>
                    <IconButton onClick={() => data.onDeleteNodeButtonClick(id)}>
                        <DeleteIcon style={{fontSize: '20px'}} />
                    </IconButton>
                </div>

                <div style={{paddingTop: '5px'}}>
                    {selection !== '' ? addActivityDetailsBtn: null}

                    {/*Additional details dialog component*/}
                    <AddDetailsDialog
                        openDialog={dialogOpenState}
                        closeDialog={() => setDialogOpenState(false)}
                        dialogName={selection}/>
                </div>

                {/*Position of the edge connectors*/}
                <Handle type="source" position={Position.Right}/>
                <Handle type="target" position={Position.Left}/>
            </div>
        </>
    );
}

export default CustomActivityNode;