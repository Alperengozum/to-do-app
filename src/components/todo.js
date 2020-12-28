import React, {Component} from 'react';
import { Space, Card} from 'antd';
import {  Modal , Button } from 'antd';
import { Input , Checkbox } from 'antd';






class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [
                {
                    id: 1,
                    title: "Test",
                    info: "Bu bir test taskdiri",
                    checked: false,
                },
                {
                    id: 2,
                    title: "Test 2",
                    info: "Bu bir test 2 taskdiri",
                    checked: false,
                }
            ],

            lastId:"",
            lastInputWork:"",
            lastInputNotes:"",

            lastUsedID:"",

            loading:false,
            loadingEdit:false,

            visible:false,
            visibleEdit:false,

        };

    }


    render() {
        const { todos } = this.state;
        const {visibleEdit , visible} = this.state
        const {lastInputWork , lastInputNotes} = this.state
        const {loading , loadingEdit} = this.state
        return (
            <div>
                <div id={"modalAddAndBasics"}>
                <Modal
                    visible={visible}
                    title="Add a new work"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,

                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <span>
                        <p>Your work:</p>
                        <Input placeholder={"Your work"} id={"inputWork"} value={lastInputWork} onChange={this.submitValue}  />
                        <br/>
                        <br/>
                        <p>Notes:</p>
                        <Input placeholder={"Notes (optional)"} id={"inputNotes"} value={lastInputNotes} onChange={this.submitValue} />
                    </span>
                </Modal>

                <Space direction="vertical">

                    <span style={{paddingLeft:5}}>
                        <span> Alperengozum's To Do List  </span>
                        <span style={{paddingLeft:360}}>
                            <Button
                                type={"primary"}
                                onClick={this.showModal}>
                                Add
                </Button></span>
                    </span>

                    { todos.map((todo,index)=>(
                        <Card key={index+todo.name} title={todo.title} style={{ width: 600}}>
                        <span>
                            <Checkbox onChange={(e)=>this.onChecked(e, todo.id)}/>
                        </span>

                            <span style={{paddingLeft:10,
                                textDecorationLine: todo.checked ? "line-through" : "unset"}}>
                                {todo.info}
                            </span>

                            <span style={{paddingLeft: 220}}>

                                <Button type="primary" onClick={() => this.showModalEdit(todo.id)} >
                                    Edit
                                </Button>
                        </span>

                            <span style={{paddingLeft: 10}}>
                            <Button type="primary" danger onClick={()=>this.onRemove(todo.id)} >
                                    Delete
                            </Button>
                        </span>

                        </Card>
                    ))}
                </Space>
                </div>
                <div id={"modalEdit"}>
                    <Modal

                        title="Edit the Work"
                        visible={visibleEdit}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelEdit}
                        okButtonProps={{ disabled: true }}
                        cancelButtonProps={{ disabled: true }}
                        footer={[
                            <Button key="backk" onClick={this.handleCancelEdit}>
                                Return
                            </Button>,

                            <Button key="submitt" type="primary" loading={loadingEdit} onClick={this.handleOkEdit}>
                                Submit
                            </Button>,
                        ]}
                    >

                    <span>
                        <p>Your work:</p>
                        <Input
                            placeholder=""
                            id={"inputWork"}
                            value={lastInputWork}
                            onChange={this.submitValue}  />
                        <br/>
                        <br/>
                        <p>Notes:</p>
                        <Input
                            placeholder={"Notes (optional)"}
                            id={"inputNotes"}
                            value={lastInputNotes}
                            onChange={this.submitValue} />
                    </span>
                    </Modal>
                </div>
            </div>
        );
    }
    handleCancelEdit = () => {
        this.setState({
            id:"",
            lastInputWork:"",
            lastInputNotes:"",
            visibleEdit: false });
    };

    handleOkEdit = () => {
        let {todos, lastId , lastInputWork , lastInputNotes} = this.state
         todos.filter((objectt) =>
            lastId === objectt.id ?
                    (objectt.title=lastInputWork,
                    objectt.info = lastInputNotes)
                : "")



        this.setState({
            todos
            }
        )


        this.setState({
            loadingEdit:true,
            id:"",
            lastInputWork:"",
            lastInputNotes:""
        })
        this.setState({
            loadingEdit: false,
            visibleEdit: false
            });

    }

    showModalEdit = (id) => {
        let {todos , lastInputWork , lastInputNotes} = this.state
        todos.filter((objectt) =>
            id === objectt.id ?
                (lastInputWork = objectt.title,
                lastInputNotes = objectt.info)
                : "")
        this.setState({
            lastId:id,
            visibleEdit:true,
        })
    }

    showModal = () => {
        this.setState({
            visible:true,
        })
    }

    handleOk = () =>{
        const {todos , lastInputWork , lastInputNotes} = this.state
        todos.push({
            id: todos.length + 2,
            title: lastInputWork,
            info: lastInputNotes,
            checked: false

        })
        this.setState(todos)
        this.setState({
            loading:true,
            lastInputWork:"",
            lastInputNotes:""
        })
        this.setState({
            loading: false,
            visible: false
            });

    }
    handleCancel = () => {
        this.setState({ visible: false });
    };


    submitValue = (e) => {
        if (e.target.id==="inputWork")
    this.setState({
        lastInputWork:e.target.value
    })
        if (e.target.id==="inputNotes")
    this.setState({
        lastInputNotes:e.target.value
    })}
    ;

    onChecked = (event, id) =>{
        const {todos} = this.state;
        const {checked} = event.target;

        const updatedTodo = todos.find(todo=> todo.id === id);
        updatedTodo.checked = checked;
        this.setState({todos});
    }

    onRemove = (id) =>{
        const {todos} = this.state;

        const newTodos = todos.filter((todo) => todo.id!== id)
        this.setState( {todos:newTodos});
    }
}

export default ToDo;