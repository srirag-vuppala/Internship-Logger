import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Company</th>
                <th>Position</th>
                <th>JobLink</th>
                <th>Info</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.Company}</td>
                <td>{row.Position}</td>
                <td>{row.JobLink}</td>
                <td>{row.Info}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
}

const Table =  (props) => {
    const { characterData, removeCharacter } = props

    return (
        <table>
            <TableHeader />
            <TableBody characterData = {characterData} removeCharacter = {removeCharacter} />
        </table>
    )
}
export default Table