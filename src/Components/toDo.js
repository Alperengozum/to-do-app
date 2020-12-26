import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Space, Card} from 'antd';
import { Popover , Modal , Button } from 'antd';
import { Input , Checkbox } from 'antd';
import "./toDoStyle.css"






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
            visible:false,

            visibleEdit:false,
            loadingEdit:false,

        };

    }


    render() {
        const { todos } = this.state;
        return (
            <div>
                <div id={"modalAddAndBasics"}>
                <Modal
                    visible={this.state.visible}
                    title="Add a new work"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,

                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <span>
                        <p>Your work:</p>
                        <Input placeholder={"Your work"} id={"inputWork"} value={this.state.lastInputWork} onChange={this.submitValue}  />
                        <br/>
                        <br/>
                        <p>Notes:</p>
                        <Input placeholder={"Notes (optional)"} id={"inputNotes"} value={this.state.lastInputNotes} onChange={this.submitValue} />
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
                        <Card title={todo.title} style={{ width: 600}}>
                        <span>
                            <Checkbox onChange={(e)=>this.onChecked(e, toxdo.id)}/>
                        </span>

                            <span style={{paddingLeft:10,
                                textDecorationLine: todo.checked === true ? "line-through" : "unset"}}>
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
                        visible={this.state.visibleEdit}
                        onOk={this.handleOk}
                        onCancel={this.handleCancelEdit}
                        okButtonProps={{ disabled: true }}
                        cancelButtonProps={{ disabled: true }}
                        footer={[
                            <Button key="backk" onClick={this.handleCancelEdit}>
                                Return
                            </Button>,

                            <Button key="submitt" type="primary" loading={this.state.loadingEdit} onClick={this.handleOkEdit}>
                                Submit
                            </Button>,
                        ]}
                    >

                    <span>
                        <p>Your work:</p>
                        <Input
                            placeholder=""
                            id={"inputWork"}
                            value={this.state.lastInputWork}
                            onChange={this.submitValue}  />
                        <br/>
                        <br/>
                        <p>Notes:</p>
                        <Input
                            placeholder={"Notes (optional)"}
                            id={"inputNotes"}
                            value={this.state.lastInputNotes}
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
        const {todos, lastId , lastInputWork , lastInputNotes} = this.state
        const newChanges= this.state.todos.filter((objectt) =>
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
        setTimeout(() => {
            this.setState({
                loadingEdit: false,
                visibleEdit: false
            });
        },1000);

    }

    showModalEdit = (id) => {

        const changes= this.state.todos.filter((objectt) =>
            id === objectt.id ?
                (this.state.lastInputWork = objectt.title.toString(),
                this.state.lastInputNotes = objectt.info.toString())
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
        this.state.todos.push({
            id: this.state.todos.length + 2,
            title: this.state.lastInputWork,
            info: this.state.lastInputNotes,
            checked: false

        })
        this.setState(this.state.todos)
        this.setState({
            loading:true,
            lastInputWork:"",
            lastInputNotes:""
        })



        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false
            });
        },1000);

    }
    handleCancel = () => {
        this.setState({ visible: false });
    };

    createCards = (id,title,info) => {

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

ToDo.propTypes = {
};

export default ToDo;