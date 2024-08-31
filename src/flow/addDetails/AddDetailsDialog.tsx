import React, {useEffect, useState} from 'react';
import {Box, Button, createTheme, Dialog, DialogActions, ThemeProvider, Typography} from "@mui/material";
import {JsonForms} from "@jsonforms/react";
import FormSchema from '../../formSchema/formSchemaDefinition.json';
import Divider from '@mui/material/Divider';
import {FormSchemaDef} from "../../interfaces/ControlSchema";
import {JsonSchema, UISchemaElement} from "@jsonforms/core";

import {
    materialRenderers,
    materialCells,
} from '@jsonforms/material-renderers';


type AddDetailsDialogProps = {
    openDialog: boolean;
    dialogName: string;
    closeDialog: () => void;
}


const initialData = {};

function AddDetailsDialog({openDialog, dialogName, closeDialog}: AddDetailsDialogProps) {
    const [data, setData] = useState(initialData);

    const controlSchema = (FormSchema as FormSchemaDef).controlSchema[dialogName] as unknown as JsonSchema;
    const uiSchema = (FormSchema as FormSchemaDef).uiSchema[dialogName] as UISchemaElement;

    const theme = createTheme({
        typography: {
            fontSize: 10,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiFilledInput: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFormControl: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFormHelperText: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiIconButton: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiInputBase: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiInputLabel: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiListItem: {
                defaultProps: {
                    dense: true,
                },
            },
            MuiOutlinedInput: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiFab: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTable: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTextField: {
                defaultProps: {
                    margin: 'dense',
                },
            },
            MuiToolbar: {
                defaultProps: {
                    variant: 'dense',
                },
            },
        },
    });



    return (
        <div>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={openDialog}
                    maxWidth={'md'}
                >
                    <Box style={{padding: '20px', width: '300px'}}>
                        <Typography
                            variant="h6"
                            style={{alignItems:'center', paddingBottom:'10px'}}>
                            {dialogName}
                        </Typography>

                        <Divider/>

                        <Box style={{paddingTop: '20px'}}>
                            <JsonForms
                                schema={controlSchema}
                                uischema={uiSchema}
                                data={data}
                                renderers={materialRenderers}
                                cells={materialCells}
                                onChange={({ errors, data }) => setData(data)}
                            />
                        </Box>
                    </Box>

                    <DialogActions>
                        <Button size={'small'} variant="outlined" style={{color: "white", backgroundColor:'darkblue'}} onClick={() => closeDialog()}>
                            Close
                        </Button>
                        <Button size={'small'} variant="outlined" style={{color: "white", backgroundColor:'darkblue'}} onClick={() => closeDialog()}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>

    );
}

export default AddDetailsDialog;