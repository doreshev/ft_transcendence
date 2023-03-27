import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import astroman from './img/littleman.png';
// const user = ;

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [urlpost, setUrlpost] = useState('');
    const [bigtext, setBigtext] = useState('');

    function handOnChangeTitle(event) {
        setTitle(event.target.value)
    }
    function handOnChangeURL(event) {
        setUrlpost(event.target.value)
    }
    function handOnChangeText(event) {
        setBigtext(event.target.value)
    }

    function handOnClickSend() {
        let temp = "Anonymus";
        let anopic = astroman;
        // if (user) {
        //     temp = user.displayName;
        //     anopic = user.photoURL;
        }
    }

    return (
        <div className='formholder'>
            <form>
                <div className="postlabel">
                    <label htmlFor="lname" >Title</label>
                </div>
                <div className="inputtext">
                    <input type="text" id="lname" name="lastname" key="110" placeholder="write your title..." value={title} onChange={handOnChangeTitle} required />
                </div>
                <div className="postlabel">
                    <label htmlFor="url">URL</label>
                </div>
                <div className="inputtext">
                    <input type="text" id="url" name="url" key="111" placeholder="http://..." value={urlpost} onChange={handOnChangeURL} required />
                </div>
                <div className="postlabel">
                    <label htmlFor="subject">Subject</label>
                </div>
                <div className="bigtext">
                    <textarea id="subject" name="subject" key="112" placeholder="Write something.." value={bigtext} onChange={handOnChangeText} required></textarea>
                </div>
                <Link to="/">
                    <div className="newpostlink">
                        <button type='button' className='submitbut' onClick={handOnClickSend}>submit</button>
                    </div>
                </Link>
            </form>
        </div>
    );
}
