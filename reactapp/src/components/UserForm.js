import React, { Component } from 'react';
import $ from 'jquery';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            email: '',
            photo: ''
        }
    }

    onSubmit = (evt) => {     
        evt.preventDefault();
        const { name, age, photo, email } = this.state;
        let formData = new FormData();

        formData.append('name', name);
        formData.append('age', age);
        formData.append('photo', photo);
        formData.append('email', email)


        fetch('/api/users', {
            method: 'POST',
            body: formData
        })
            .then(r => r.json())
            .then(data => {
                $('#formModal').modal('hide');              
                this.props.loadHandler();
            })
    }
    onChange = (evt) => {
        evt.preventDefault();
        switch (evt.target.name) {
            case 'photo':
                this.setState({ photo: evt.target.files[0] });
                break;
            default:
                this.setState({ [evt.target.name]: evt.target.value });
        }
    }
    render() {
        const { name, age, email, photo } = this.state;
        return (
            <div className="modal fade" id="formModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">使用者新增</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">姓名</label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.onChange} placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">年紀</label>
                                    <input type="number" className="form-control" id="age" name="age" value={age} onChange={this.onChange} placeholder="Enter Age" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">電子郵件</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.onChange} placeholder="Enter Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo">圖像</label>
                                    <input type="file" className="form-control" id="photo" name="photo" onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary mr-3">新增</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserForm;