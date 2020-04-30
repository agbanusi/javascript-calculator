let count=0; //count of decimal points
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      operation:'', //the state of the numbers/symbols punched
      answer:'0',   //the state of each number punched in real time and answers
      mid:'',       //the backend calculation which is not shown
      backans:'',   //the backend of the answer due to the need to push zero at the beginning of the anser state, it is disposed here
      backend:''    //the backend of the operation state, to allow for continuation of calculation after using the equal to and avoid errors.
    }
    this.equal=this.equal.bind(this); //for the equal to sign
    this.add=this.add.bind(this);     //add numbers or symbols to the display
    this.clear=this.clear.bind(this)  //clear to default state
    this.back=this.back.bind(this)    //remove the leatest puched number
    this.op=this.op.bind(this)        //function for monitoring operands state and avoid calculation errors
    this.op1=this.op1.bind(this)    //this is a function dedicated to the zero number
    this.op2=this.op2.bind(this)    //this is a function dedicated to the decimal point
  }
  add(e){
    if(e.target.className=='-'){
      if(this.state.operation[this.state.operation.length-1]=='-'){
        this.setState({
          operation:this.state.backend.slice(0,-1).concat(e.target.className),
          backend:this.state.backend.slice(0,-1).concat(e.target.className),          
          mid:this.state.mid.slice(0,-1).concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
      })
      }
      else{
        this.setState({
          operation:this.state.backend.concat(e.target.className),
          backend:this.state.backend.concat(e.target.className),
          mid:this.state.mid.concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
           })
      }
      count=0;
    }
    else{
      if(this.state.operation[this.state.operation.length-1]=='+'|| this.state.operation[this.state.operation.length-1]=='*'||this.state.operation[this.state.operation.length-1]=='/'||this.state.operation[this.state.operation.length-1]=='-'){
      this.setState({
      operation:this.state.operation.concat(e.target.className),
      backend:this.state.backend.concat(e.target.className),
      mid:this.state.mid.concat(e.target.className),
      backans:e.target.className,
      answer:e.target.className
    })
    }
    else{
      this.setState({
      operation:this.state.operation.concat(e.target.className),
      backend:this.state.backend.concat(e.target.className),
      mid:this.state.mid.concat(e.target.className),
      backans:this.state.backans.concat(e.target.className),
      answer:this.state.backans.concat(e.target.className)
    })
    }
    }
    
  }
  op(e){
      if(this.state.operation[this.state.operation.length-1]=='+'|| this.state.operation[this.state.operation.length-1]=='*'||this.state.operation[this.state.operation.length-1]=='/'){
        this.setState({
          operation:this.state.backend.slice(0,-1).concat(e.target.className),
          backend:this.state.backend.slice(0,-1).concat(e.target.className),          
          mid:this.state.mid.slice(0,-1).concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
      })
      }
      else if(this.state.operation[this.state.operation.length-1]=='-'){
        if(this.state.operation[this.state.operation.length-2]=='+'|| this.state.operation[this.state.operation.length-2]=='*'||this.state.operation[this.state.operation.length-2]=='/'){
        this.setState({
          operation:this.state.backend.slice(0,-2).concat(e.target.className),
          backend:this.state.backend.slice(0,-2).concat(e.target.className),          
          mid:this.state.mid.slice(0,-2).concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
      })
      }
      }
      else{
        this.setState({
          operation:this.state.backend.concat(e.target.className),
          backend:this.state.backend.concat(e.target.className),
          mid:this.state.mid.concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
           })
      }
      count=0
  }
  op1(e){
    if(this.state.operation[this.state.operation.length-1]=='0'){
      this.setState({
          operation:this.state.backend.slice(0,-1).concat(e.target.className),
          backend:this.state.backend.slice(0,-1).concat(e.target.className),          
          mid:this.state.mid.slice(0,-1).concat(e.target.className),
          backans:e.target.className,
          answer:e.target.className
      })
      } 
      else{
        this.setState({
          operation:this.state.backend.concat(e.target.className),
          backend:this.state.backend.concat(e.target.className),
          mid:this.state.mid.concat(e.target.className),
          backans:this.state.backans.concat(e.target.className),
          answer:this.state.backans.concat(e.target.className)
           })
      }
  }
  op2(e){
    if(this.state.operation[this.state.operation.length-1]=='.'){
        this.setState({
          operation:this.state.backend.slice(0,-1).concat(e.target.className),
          backend:this.state.backend.slice(0,-1).concat(e.target.className),          
          mid:this.state.mid.slice(0,-1).concat(e.target.className),
          backans:this.state.backans.slice(0,-1).concat(e.target.className),
          answer:this.state.answer.slice(0,-1).concat(e.target.className)
      })
      count+=1
      } 
      else{
        if(count<1){
          this.setState({
          operation:this.state.backend.concat(e.target.className),
          backend:this.state.backend.concat(e.target.className),
          mid:this.state.mid.concat(e.target.className),
          backans:this.state.backans.concat(e.target.className),
          answer:this.state.backans.concat(e.target.className)
           })
           count+=1
        }
        else{
          this.setState({
          operation:this.state.backend,
          backend:this.state.backend,
          mid:this.state.mid,
          backans:this.state.backans,
          answer:this.state.backans
           })
        }
        
      }
  }
  equal(){
    this.setState({
      operation:this.state.mid+'='+(+eval(this.state.mid).toFixed(7)),
      backend:''.concat(+eval(this.state.mid).toFixed(5)),
      mid:''.concat(+eval(this.state.mid).toFixed(5)),
      backans:+eval(this.state.mid).toFixed(5),
      answer:+eval(this.state.mid).toFixed(5)
    })
    count=0;
  }
  clear(){
    this.setState({
        operation:'',
        answer:'0',
        mid:'',
        backend:'',
        backans:''
    })
    count=0;
  }
  back(){
    this.setState({
      operation: this.state.operation.slice(0,-1),
      backend: this.state.backend.slice(0,-1),
      mid:this.state.backend.slice(0,-1),
      backans:this.state.backans.slice(0,-1)
    })
  }
  render() {
    return (
      <div className='body'>
      <div className='calc'>
      <div className='operation'>{this.state.operation}</div>
      <div className='answer' id='display'>{this.state.answer}</div>
      </div>
      <div className='keypads'>
        <button onClick={this.add} className='1' id='one'>1</button>
        <button onClick={this.add} className='2' id='two'>2</button>
        <button onClick={this.add} className='3' id='three'>3</button>
        <button onClick={this.add} className='4' id='four'>4</button>
        <button onClick={this.add} className='5' id='five'>5</button>
        <button onClick={this.add} className='6' id='six'>6</button>
        <button onClick={this.add} className='7' id='seven'>7</button>
        <button onClick={this.add} className='8' id='eight'>8</button>
        <button onClick={this.add} className='9' id='nine'>9</button>
        <button onClick={this.op1} className='0' id='zero'>0</button>
        <button onClick={this.op} className='+' id='add'>+</button>
        <button onClick={this.add} className='-' id='subtract'>-</button>
        <button onClick={this.op} className='*' id='multiply'>x</button>
        <button onClick={this.op} className='/' id='divide'>/</button>
        <button onClick={this.op2} className='.' id='decimal'>.</button>
        <button onClick={this.equal}  className='equalto' id='equals'>=</button>
        <button onClick={this.clear}  className='clear' id='clear'>AC</button>
        <button onClick={this.back}  className='back' id='back'>delete</button>
      </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
