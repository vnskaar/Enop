import React from "react";
import Nav from './Nav'

const Layout = (props) =>
    <div
        class="text-center p-10">
        {props.children}
    </div>


export { Layout, Nav };
