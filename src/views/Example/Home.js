import React from "react";
import { withRouter } from "react-router-dom";
import rainbow from "../../assets/images/rainbow.jpg"
import { connect } from 'react-redux'


class Home extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/todo')
        }, 60000);
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user)
    }

    handleCreateUser = () => {
        this.props.addUserRedux()
    }

    render() {
        let listUsers = this.props.dataRedux
        return (
            <>
                <div>Welcome to my website</div>
                <div>
                    <img src={rainbow} style={{ width: '200px', marginTop: '20px' }} />
                </div>
                <div>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1} - {item.name}
                                    &nbsp; <span onClick={() => { this.handleDeleteUser(item) }}>x</span>

                                </div>
                            )
                        })
                    }
                    <button onClick={() => { this.handleCreateUser() }}>Add New</button>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return { dataRedux: state.users }
}
const mapDispathchToProps = (dispatch) => {
    return {
        deleteUserRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        addUserRedux: () => dispatch({ type: 'CREATE_USER' })
    }
}

export default connect(mapStateToProps, mapDispathchToProps)(withRouter(Home))
