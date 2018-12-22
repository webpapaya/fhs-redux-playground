import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
    shouldRenderChildren: (state.userAuthentication.expiryDate >= new Date()) === props.authenticated
});

export default connect(mapStateToProps)(({ children, shouldRenderChildren }) => 
    shouldRenderChildren 
        ? children
        : null);
