import { useEffect, useState } from 'react'
/**
 * Note component
 * 
 * This is the note component that allows users to add notes to the content.
 * It is only visible to the signed in user and fetches from the Note endpoint.
 * 
 * @author Pik Sum Siu
 */

function Note(props) {

    const [note, setNote] = useState([])

    useEffect(() => {

        fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/note?content_id=' + props.content_id,
            {
                method: 'GET',
                headers: new Headers(
                    { "Authorization": "Bearer " + localStorage.getItem('token') }
                ),
            }
        ).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('invalid response: ' + response.status);
            }
        })
            .then(data => {

                if (data !== null && data !== '') {
                    if (Array.isArray(data) && data.length > 0) {
                        setNote(data[0].note);
                    }

                }
            })
            .catch(error => console.error('Error:', error));

    }, [])

    const saveNote = () => {
        let formData = new FormData();
        formData.append('content_id', props.content_id)
        formData.append('note', note)

        fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/note',
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') }),
                body: formData,
            }
        )
            .then(response => {
                if ((response.status === 200) || (res.status === 204)) {
                    return response.json();
                } else {
                    throw new Error('invalid response: ' + response.status);
                }
            })

    }

    return (
        <div className="flex flex-col p-5 overflow-">
            <textarea
                name="note"
                placeholder="note"
                rows="6"
                cols="10"
                maxLength="250"
                className="p-2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <input
                name="save"
                type="submit"
                value="save"
                className="w-full my-2 bg-slate-700 text-white rounded-md hover:bg-slate-500"
                onClick={saveNote}
            />
        </div>
    )
}

export default Note