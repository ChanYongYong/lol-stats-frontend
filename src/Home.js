import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"

let Home = ({className='home-center'}) =>{ //{className='home-center'} 없으면 오류 생기는 이유 찾기
    const [region,setRegion]=useState('KR'); //한국서버로 만들거라 따로 기능 구성은 안 할거임
    const [name,setName] = useState('');
    const [tag,setTag]=useState('');

    const navigate = useNavigate(); //페이지 이동

    const handleSearch = ()=>{
        if(!name || !tag){
            alert("이름과 태그를 입력하세요.");
            return;
        }

        navigate(`/match/${region}/${name}/${tag}`);
    }

    return (
        <div className={className}>
            <div className="search-bar">
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="region-select">
                    <option value="KR">KR</option>
                    <option value="NA">NA</option>
                    <option value="EUW">EUW</option>
                    <option value="EUNE">EUNE</option>
                    <option value="JP">JP</option>

                </select>
                <input type="text" placeholder="소환사 이름" value={name} onChange={(e) => setName(e.target.value)} className="name-input"/>
                <input type="text" placeholder="태그 (예 : kr1)" value={tag} onChange={(e) => setTag(e.target.value)} className="name-input"/>
                <button onClick={handleSearch} className="search-button">검색</button>
            </div>
        </div>
    )
}

export default Home;