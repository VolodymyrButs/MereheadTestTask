import React, { useState } from 'react'

import { FormStyled } from './CreateUser'

export const EditUser = ({ user, getUsers }) => {
    const [editedUserName, setEditedUserName] = useState('')
    const [editedUserSurname, setEditedUserSurname] = useState('')
    const [editedUserDescription, setEditedUserDescription] = useState('')
    const [isVisibleEditWindow, setIsVisibleEditWindow] = useState(false)
    console.log(user)
    const handleEditUserNameChange = (e) => {
        setEditedUserName(e.currentTarget.value)
    }
    const handleEditUserSurname = (e) => {
        setEditedUserSurname(e.currentTarget.value)
    }
    const handleEditUserDescription = (e) => {
        setEditedUserDescription(e.currentTarget.value)
    }
    const handlerDeleteUser = () => {
        const del = window.confirm('Delete?')
        del &&
            fetch(`https://77.120.241.80:8911/api/user/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                response.ok && getUsers()
            })
    }

    const handlerEditUser = (e) => {
        e.preventDefault()
        fetch(`https://77.120.241.80:8911/api/user/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: editedUserName,
                surname: editedUserSurname,
                desc: editedUserDescription,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            response && getUsers()
            response && setIsVisibleEditWindow(false)
        })
    }

    return (
        <>
            {!isVisibleEditWindow && (
                <>
                    <button onClick={() => handlerDeleteUser()}>
                        Delete user
                    </button>
                    <button
                        onClick={() => {
                            setEditedUserName(user.name)
                            setEditedUserSurname(user.surname)
                            setEditedUserDescription(user.desc)
                            setIsVisibleEditWindow(true)
                        }}
                    >
                        Edit user
                    </button>
                </>
            )}

            {isVisibleEditWindow && (
                <FormStyled onSubmit={handlerEditUser}>
                    <h3>Edit user</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="input name"
                        defaultValue={editedUserName}
                        onChange={handleEditUserNameChange}
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="input surname"
                        defaultValue={editedUserSurname}
                        onChange={handleEditUserSurname}
                        required
                    />
                    <input
                        type="text"
                        name="desc"
                        placeholder="input desc"
                        defaultValue={editedUserDescription}
                        onChange={handleEditUserDescription}
                        required
                    />
                    <button type="submit">Edit user</button>
                    {isVisibleEditWindow && (
                        <button onClick={() => setIsVisibleEditWindow(false)}>
                            Cancel edit
                        </button>
                    )}
                </FormStyled>
            )}
        </>
    )
}
