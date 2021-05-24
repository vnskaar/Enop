import React from "react";
import Nav from './Nav'
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const Layout = (props) =>
    <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        style={{ minHeight: '90vh' }}
    >
    <div
        class="text-center p-10">
        {props.children}
    </div>
    </Grid>


export { Layout, Nav };
