import React,{Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../Backdrop/Backdrop';
class Modal extends Component
{
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps.show !==this.props.show);
        return nextProps.show!==this.props.show ||nextProps.children!==this.props.children;
    }

    componentDidUpdate(){
        console.log("Component will update --Modal");
    }
    render(props){
        return(
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.closeModal}></BackDrop>
                <div className={classes.Modal}
                    style={{transform: this.props.show ?'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;