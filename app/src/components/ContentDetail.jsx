import { useState, useEffect } from "react";
import Note from "./Note";
/**
 * ContentDetail component
 * 
 * This component handles and displays the details of the content and affilicated author(s).
 * It uses and gets AuthorAndAffiliation endpoint to get the author(s) of the content.
 * It handles saving and unsaving the content for each user.
 * 
 * @author Pik Sum Siu
 */


function ContentDetail(props) {
    const [visible, setVisible] = useState(false);
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        if (visible && props.content && props.content.id) {
            fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/authorandaffiliation?content=' + props.content.id)
                .then(response => response.json())
                .then(data => {
                    setAuthor(data)
                    if (data.length === 0) {
                        setAuthor([{ author: "No author found" }])
                    }
                })
                .catch(error => console.error('Error:', error));
        } else if (!visible) {
            setAuthor([]);
        }
    }, [visible, props.content]);

    const authorJSX = author.map((author, index) => {

        return <li key={index}>{author.author_name}, {author.institution}, {author.country}</li>
    });

    const showDetails = () => {
        setVisible(prevVisible => !prevVisible);
    }

    const notSave = () => {
        fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/save?content_id=' + props.content.id,
            {
                method: 'DELETE',
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') }),
            }
        )
            .then(res => {
                if ((res.status === 200) || (res.status === 204)) {

                    props.setSave(props.save.filter(
                        fav => fav !== props.content.id
                    ))
                }
            })

    }
    const setSave = () => {
        let formData = new FormData();
        formData.append('content_id', props.content.id)

        fetch('https://w20012367.nuwebspace.co.uk/kf6012/coursework/api/save',
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') }),
                body: formData,
            }
        )
            .then(res => {
                if ((res.status === 200) || (res.status === 204)) {
                    props.setSave([...props.save, props.content.id])
                }
            })
    }

    const isSave = (props.save.includes(props.content.id))
        ? <span onClick={notSave} >⭐</span>
        : <span onClick={setSave}>🔲</span>

    return (
        <>
            <section className='bg-white h-30 overflow-auto m-4 p-2 rounded-md text-black hover:bg-gray-300'>
                <h3 onClick={showDetails}><b> {props.content.title}</b></h3>
                {isSave}
                {visible && <div className='p-2 m-1'>
                    <p className='m-1'><b>Type:</b> {props.content.type}</p>
                    <p className='m-1'><b>Abstract:</b> {props.content.abstract}</p>
                    {props.content.award && <p className='m-1'><b>Award:</b> {props.content.award}</p>}
                    <ul className='p-1'><b>Author:</b>{authorJSX}</ul>
                    <Note content_id={props.content.id} />
                </div>}
            </section>

        </>
    )
}

export default ContentDetail;