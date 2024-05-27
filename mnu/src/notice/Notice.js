import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import { Link, useSubmit } from 'react-router-dom';
// import Pagination from "react-js-pagination"
import './box.css';
import './subject.css'
import './posting.css'


function Subject() {
    return (
        <div className='subject'>
            <h1>공지사항</h1>
        </div>
    )
}

function Search() {
    return (
        <div className='container'>
            <div className="box">
                <span className="text">검색하기</span>
                <select className="comboBox">
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                </select>
                <input type='text' className='searchBox' placeholder='검색어를 입력해 주세요.' />
                <button type='button' className='iconButton'>
                    <BiSearch />
                </button>
            </div>
        </div>
    )
}

function Posting({totalPosts}) {
    console.log(totalPosts)
    return (
        <div>
            <div className='posting'>
                ※ 공개글 작성 시 주민등록번호, 외국인등록번호, 운전면허번호, 계좌번호 등 개인정보를 입력하시면 안됩니다.
            </div>

            <table className='postingTable'>
                <thead>
                    <tr>
                        <th className='thNumber'>번호</th>
                        <th className='thTitle'>제목</th>
                        <th className='thWriter'>작성자</th>
                        <th className='thDate'>작성일</th>
                        <th className='thCount'>조회수</th>
                        <th className='thFile'>첨부파일</th>
                    </tr>
                </thead>
                <tbody>
                    {totalPosts === 0 ? (
                        <tr>
                            <td colSpan="6">게시글 없음</td>
                        </tr>
                    ) : (
                        <td></td>
                    )}
                   <tr></tr>
                </tbody>
            </table>
        </div>
    );
}


function Page() {
    const [totalPosts, setTotalPosts] = useState(0);

    const handleNewPostAdded = () => {
        setTotalPosts(totalPosts + 1);
    };

    const calTotalPages = () => {
        return totalPosts === 0? 1 : Math.ceil(totalPosts / 10);
    };

    return (
        <div>
            <Posting totalPosts={totalPosts} />
            <button onClick={handleNewPostAdded}>
                게시글 추가
            </button>
            <Stack spacing={2}>
            <Pagination count={calTotalPages()} />
            </Stack>
            <div>
                총 게시글 수 : {totalPosts}
            </div>
        </div>
        
    );
  }



export default {
    Subject,
    Search,
    Posting,
    Page
};