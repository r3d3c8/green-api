import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import 'reflect-metadata'

import {BlueprintProvider} from '@blueprintjs/core';

import router from './router'

import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.scss'

import AppToaster from "./modules/common/components/AppToaster";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <BlueprintProvider>
            <AppToaster/>
            <RouterProvider router={router}/>
        </BlueprintProvider>
    </React.StrictMode>,
)
