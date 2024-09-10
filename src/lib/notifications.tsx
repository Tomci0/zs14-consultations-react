import React from 'react';

import { toast, ToastOptions, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/notify.scss';

import { Icon } from '@iconify/react';

export function notify(text: string = 'Hello World!', options: ToastOptions = {}): Id {
    let defaultOptions: ToastOptions = {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <Icon icon="mdi:info" />,
    };

    options = Object.assign(defaultOptions, options);

    return toast(text, options);
}

export function notifyPromise(text: string = 'Proszę Poczekać...', options: ToastOptions = {}): Id {
    let defaultOptions: ToastOptions = {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    options = Object.assign(defaultOptions, options);

    return toast.loading(text, options);
}

export function updateNotify(
    id: Id,
    text: string,
    isLoading: boolean = false,
    options: ToastOptions = { type: 'info' }
) {
    const defaultOptions = {
        render: text,
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        isLoading,
    };

    toast.update(id, Object.assign(defaultOptions, options));
}
