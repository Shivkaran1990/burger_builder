import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  // state={
  //   show:true
  // }
  // componentWillMount()
  // {
  //  setTimeout(()=>{ this.setState({show :false});}
  //  ,5000);
  // }  {this.state.show ?<BurgerBuilder></BurgerBuilder> :null} 
  render(){
    return (
      <div className="">
        <Layout>
         <BurgerBuilder></BurgerBuilder>
        </Layout>
       </div>
    );
  }
}

export default App;
