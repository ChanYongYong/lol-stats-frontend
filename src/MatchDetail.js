// 확인할 사항. 스펠 이미지 처리,

import {useState} from "react";
import {data} from "react-router-dom";
import "./MatchDetail.css"

const spellIdToName = {
    1: 'SummonerBoost',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    11: 'SummonerSmite',
    12: 'SummonerTeleport',
    13: 'SummonerMana',
    14: 'SummonerDot',
    21: 'SummonerBarrier',
    30: 'SummonerPoroRecall',
    31: 'SummonerPoroThrow',
    32: 'SummonerSnowball',
    39: 'SummonerMark',
    54: 'Summoner_UltBookPlaceholder',
    55: 'Summoner_UltBookSmitePlaceholder'
};

// 스펠 이미지 가져오기
const getSpellImg = (id) => {
    const name = spellIdToName[id];
    return name ? `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/spell/${name}.png` : ''; //이미지가 안 나오게 끔 처리
}
// 아이템 이미지 가져오기
const getItemImg = (id) => `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/item/${id}.png`;

// 챔피언 이미지 가져오기
const getChampImg = (name) => `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${name}.png`;

// 게임 모드명 가져오기
const getQueueName = (queueId) => {
    switch (queueId) {
        case 420:
            return '솔로랭크';
        case 430:
            return '일반';
        case 440:
            return '자유랭크';
        case 450:
            return '칼바람 나락';
        case 900:
            return '우르프';
        case 1700:
            return '아레나';
        default:
            return '기타';
    }
};

// UI 생성
let MatchDetail = ({match}) => {
    const [showDetail, setShowDetail] = useState(false);

    if (!match || !match.champion) return null;

    const formatTime = (timestamp) => {       // 그냥 시간 반환하면 되는거 아닌가? 이건 무슨코드지?
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    const renderTeamTable = (team) =>{
        const maxDamage = Math.max(...team.map(p=>p.damage));
        return(
            <table className="team-table">
                <thead>
                <tr>
                    <th>소환사</th>
                    <th>챔피언</th>
                    <th>스펠</th>
                    <th>KDA</th>
                    <th>피해량</th>
                    <th>와드</th>
                    <th>CS</th>
                    <th>아이템</th>
                </tr>
                </thead>
                <tbody>
                {team.map((p, idx) => (
                    <tr key={idx} className={p.name === match.name ? 'highlight-player' : ''}>
                        <td>{p.name}</td>
                        <td>
                            <div className="champion-cell">
                                <img src={getChampImg(p.champion)} alt={p.champion} className="champion-icon"/>
                                <span>{p.champion}</span>
                            </div>
                        </td>
                        <td>
                            {p.spells?.spell1Id && <img src={getSpellImg(p.spells.spell1Id)} alt="spell1" width="20"/>}
                            {p.spells?.spell2Id && <img src={getSpellImg(p.spells.spell2Id)} alt="spell2" width="20"/>}
                        </td>
                        <td>{p.kda}</td>
                        <td>
                            {p.damage}
                            <div className="damage-bg">
                                <div className="damage-bar" style={{width: `${(p.damage / maxDamage) * 100}%`}}></div>
                            </div>
                        </td>
                        <td>{p.vision}</td>
                        <td>{p.cs}</td>
                        <td className="item-list">
                            {p.items.map((item, idx) => item !== 0 && (
                                <img key={idx} src={getItemImg(item)} alt={`item${item}`} width="24"
                                     className="item-icon"/>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }


    return (
        <div>
            <div className={`match-summary ${match.win ? 'win' : 'lose'}`}
                 onClick={() => setShowDetail(!showDetail)}>  {/*승패를 색으로 표시, 클릭시 팀테이블 나타남*/}
                <div className="champion-warp">
                    <img src={getChampImg(match.champion)} alt={match.champion} width="48" className="champion-icon"/>
                    <div className="champion-level">{match.level}</div>
                </div>
                <div className="sumary-content">
                    <div className="champion-name">{match.champion} <span>{match.kda}</span></div>
                    <div>{match.name}#{match.tag}</div>
                    <div>CS: {match.cs} / 피해량: {match.damage}</div>
                </div>
                <div className="spells-box">
                    {match.spells?.spell1Id && <img src={getSpellImg(match.spells.spell1Id)} alt="spell1" width="24" className="spell-icon"/>} {/* ?의 의미 확인하기 */}
                    {match.spells?.spell2Id && <img src={getSpellImg(match.spells.spell2Id)} alt="spell2" width="24" className="spell-icon"/>}
                </div>
            </div>

            {/* showDetail 클릭 시 */}
            {
                showDetail && (
                    <div className="team-details">
                        <div>게임 모드: {getQueueName(match.queueId)} | {formatTime(match.gameStartTimestamp)}</div>
                        <h4>아군 팀</h4>
                        {renderTeamTable(match.teams.ally)}
                        <h4>적군 팀</h4>
                        {renderTeamTable(match.teams.enemy)}
                    </div>
            )}

        </div>
    )
}

export default MatchDetail;