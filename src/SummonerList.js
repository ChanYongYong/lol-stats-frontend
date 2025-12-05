import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MatchDetail from "./MatchDetail";
import Rank from "./Rank";
import Home from "./Home";

let SummonerList = () => {
    const { region, name, tag } = useParams();
    const [matches,setMatches]=useState([]);//데이터 시각화하기 위해 담는 변수

    let getMatchList = async()=>{
        axios.get('https://lol-stats-backend.onrender.com/user/matches', {
            params:{
                region:region,
                name: name,
                tag: tag
            }
        }).then(res=>{
            console.log(res.data);
            setMatches(res.data);// match에 데이터 추가

        }).catch(err=>{
            console.error(err);
        })
    }

    useEffect(()=>{
        getMatchList();

    },[region,name,tag]); // getMatchList가 해당 페이지에 왔을 때 실행이 되어야 하기에 사용, 딱 한번만 실행, 변수 3개가 바뀌었을 경우 새로  가져야 하니까 작성

    return (
        <div>
            <Home className='home-top'/>
            <Rank />
            {matches.length> 0?(
                matches.map((match,idx)=>(
                    <MatchDetail key={idx} match={match}/> // match와 matchDetail 추가해야 함
                ))
            )  : (
                <p>전적을 불러오는 중...</p>
            )}  
        </div>
    )
}
export default SummonerList;