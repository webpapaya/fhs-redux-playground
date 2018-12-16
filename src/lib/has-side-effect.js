import React from 'react';

class SideEffectLoader extends React.Component {
    state = {
        wasLoaded: false,
        isLoading: false,
    };

    get config() { 
        return {
            props: [],
            fnName: 'sideEffect',
            wasLoadedName: 'wasLoaded',
            isLoadingName: 'isLoading',
            ...this.props.config,
        }; 
    }
    shouldReload = (prevProps) => 
        !!this.config.props.find((key) => this.props[key] !== prevProps[key]);

    safeSetState = (...args) => 
        new Promise((resolve) => this.setState(...args, resolve));

    reload = () => {
        if(!this.props.parentProps['sideEffect']) { return Promise.resolve(); }
        return Promise.resolve()
            .then(() => this.safeSetState(() => ({ isLoading: true })))
            .then(() => this.props.parentProps['sideEffect']())
            .then(() => this.safeSetState(() => ({ wasLoaded: true, isLoading: false })))
            .catch(() => this.safeSetState(() => ({ isLoading: false })))
    }

    componentDidMount() {
        this.reload();
    }

    componentDidUpdate(prevProps) {
        if (this.shouldReload(prevProps)) {
            this.reload()
        }
    }

    render() {
        const additionalProps = { 
            [this.config.wasLoadedName]: this.state.wasLoaded,
            [this.config.isLoadingName]: this.state.isLoading, 
        }
        return <this.props.Component { ...this.props.parentProps } { ...additionalProps } />;
    }
}

export default (config = {}) => (Component) => (parentProps) => {
    return (
        <SideEffectLoader
            config={config}
            parentProps={ parentProps }   
            Component={Component}
        />
    );
}