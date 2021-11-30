import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import { HashLink, HashLink as Link } from 'react-router-hash-link';
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import './css/globals.css'
import './css/styleguide.css'
import './css/web-1920-1.css'
import backgroundButtonConnect from "./img/btn_connect_natural.png";
import backgroundButtonBuy from "./img/btn_buy_natural.png";
import plusButton from "./img/btn_plus_natural.png";
import minusButton from "./img/btn_minus_natural.png";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;
export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;
export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 200px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
     box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ConnectButton = styled.button`
  padding: 10px;
  width: 487px;
  height: 162px;
  border: 0;
  background: #6718C7;
`;

export const BuyButton = styled.button`
  width: 372px;
  height: 121px;
  border: 0;
  background: #6718C7;
  position: absolute;
  right: 40px;
  top: 90px
`;

export const StyledLink = styled.a`
  color: var(--white);
  font-size: var(--font-size-m);
  font-style: normal;
  font-weight: 600;
  font-family: var(--font-family-montserrat);
  flex: 1;
  letter-spacing: 0;
  line-height: 25px;
  margin-bottom: -4.5px;
  margin-right: -2px;
  margin-top: 2.5px;
  white-space: nowrap;
  width: 82px;
  text-decoration: none;
`;
export const StyledRoundButton = styled.button`
  margin-top: -40px;
  margin-left: 62px;
  border: none;
  padding: 10px;
  width: 113px;
  height: 73px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const dispatch = useDispatch();
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };
  
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
    
  
  }

  const images = importAll(require.context('./img', false, /\.png/));

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=1920, maximum-scale=1.0" />
      <link rel="shortcut icon" type="image/png" href="https://animaproject.s3.amazonaws.com/home/favicon.png" />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="photo" />
      <link rel="stylesheet" type="text/css" href="css/web-1920-1.css" />
      <link rel="stylesheet" type="text/css" href="css/styleguide.css" />
      <link rel="stylesheet" type="text/css" href="css/globals.css" />
      <input type="hidden" id="anPageName" name="page" defaultValue="web-1920-1" />
      <div className="container-center-horizontal">
        <div className="web-1920-1 screen">
          <div className="overlap-group18">
            <div className="overlap-group10">
              <div className="rectangle-1" />
              <img className="union-8" src={images["union-8@1x.png"].default} />
              <div className="group-18">
                <div className="overlap-group">
                  <img className="path-29" src={images["path-29-1@1x.png"].default} />
                  <img className="path-30" src={images["path-30-1@1x.png"].default} />
                  <img className="path-31" src={images["path-31-1@1x.png"].default} />
                  <div className="group-16"><img className="path-32" src={images["path-32-1@1x.png"].default} /></div>
                </div>
              </div>
              <img className="group-20" src={images["group-20@1x.png"].default} />
              <div className="group-29">
                <div className="component-16-1">
                  <div className="about-us montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/path#AboutUsTag">About us</HashLink></div>
                </div>
                <div className="component-15-1">
                  <div className="road-map montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/pathLink#RoadMapTag">Road Map</HashLink></div>
                </div>
                <div className="component-14-1">
                  <div className="goa-ls montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/pathLink#GoalsTag">Goals</HashLink></div>
                </div>
                <div className="component-13-1">
                  <div className="r-arity montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/pathLink#RarityTag">Rarity</HashLink></div>
                </div>
                <div className="component-12-1"><div className="team montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/pathLink#TeamTag">Team</HashLink></div></div>
                <div className="component-11-1"><div className="faq montserratalternates-semi-bold-white-25px"><HashLink style={{ color: 'inherit', textDecoration: 'inherit'}} smooth to="/pathLink#FAQTag">FAQ</HashLink></div></div>
              </div>
              <div className="group-4"><img className="union-7" src={images["union-7@1x.png"].default} /></div>
              {/*<s.TextTitle
              style={{
                position: "absolute",
                top: "650px",
                right: "446px",
                textAlign: "center",
                fontSize: 40,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY} has been minted
            </s.TextTitle>*/}
              <div id= "AboutUsTag" className="about-us-1">ABOUT US</div>
              <img className="path-22" src={images["path-22@1x.png"].default} />
              <img className="path-23" src={images["path-23@1x.png"].default} />
              <img className="path-25" src={images["path-24@1x.png"].default} />
              <img className="path-24" src={images["path-25@1x.png"].default} />
              <img className="path-26" src={images["path-26@1x.png"].default} />
            {/* <div className="component-17-1">          
          <s.Container>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.SpacerSmall />
              </>
            ) : (
              <>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <ConnectButton style={{ backgroundImage: `url(${backgroundButtonConnect})`}}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                    </ConnectButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton 
                        style={{ marginLeft: "59px", marginRight: "73px", backgroundImage: `url(${minusButton})` }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        
                      </StyledRoundButton>
                      <s.TextDescription
                        style={{
                          fontSize: "30px",
                          color: "var(--accent-text)",
                          top: "15px",
                          left: "255px",
                          position: "absolute",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <StyledRoundButton style={{ marginLeft: "40px", backgroundImage: `url(${plusButton})`}}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <BuyButton style={{ backgroundImage: `url(${backgroundButtonBuy})`}}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : ""}
                      </BuyButton>
                      <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                        position: "absolute",
                        fontSize: "23px",
                        top: "228px",
                        right: "-40px",
                        width: "530px",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
                    <s.SpacerLarge />
          
        
                    </div> */}
              <img className="x08" src={images["08@1x.png"].default} />
            </div>
            <div className="overlap-group7">
              <div className="group-19">
                <div className="overlap-group1">
                  <img className="path-29-1" src={images["path-29-2@1x.png"].default} />
                  <img className="path-30-1" src={images["path-30-2@1x.png"].default} />
                  <img className="path-31-1" src={images["path-31-2@1x.png"].default} />
                  <img className="path-32-1" src={images["path-32-2@1x.png"].default} />
                </div>
              </div>
              <div className="rectangle-7" />
              <div id="RoadMapTag" className="road-map-1 asphalt-black-white-94px">ROAD MAP</div>
              <img className="path-33" src={images["path-23@1x.png"].default} />
              <img className="path-34" src={images["path-24@1x.png"].default} />
              <img className="mapnobg" src={images["map-no-bg@1x.png"].default} />
            </div>
            <div className="text-1">
              <span className="montserratalternates-semi-bold-lilac-25px">10k Machine Generated Bears Built Into<br />the Ethereum Blockchain By An International Team<br /><br />after
                Growing A Core Community Of Die-hard Bears<br />over Six Months Of 1/1 Drops, The Barely Bears 10k Cave
                Opens 1</span><span className="montserratalternates-semi-bold-lilac-25px">s</span><span className="montserratalternates-semi-bold-lilac-25px">T December</span>
            </div>
            <div className="text-2">
              -350 Hand-drawn Traits From Israeli Animator Ori<br />-nods To The Silver Screen, Gaming, Cult Classics And
              More<br />-1/1 Traits Suggested By Our Discord Community
            </div>
          </div>
          <div className="component-9-2">
            <HashLink smooth to="/path#top"><div className="group-26" /></HashLink>
          </div>
          <div className="component-9-1">
            <a href="http://discord.gg/M2wpH2BpbA" target="_blank"><div className="group-25" /></a>
          </div>
          <div className="component-10-1">
            <a href="https://twitter.com/BearsAreBarely" target="_blank"><div className="group-28" /></a>
          </div>
          <div className="overlap-group15">
            <div id="GoalsTag" className="text-3">GOALS FOR<br />COMPLITION</div>
            <img className="path-128" src={images["path-128@1x.png"].default} />
          </div>
          <div className="overlap-group12">
            <div className="overlap-group17"><img className="mask-group-9" src={images["mask-group-9@1x.png"].default} /></div>
            <div className="address montserrat-extra-bold-purple-heart-20px">10 IRL CARE PACKAGES SENT TO OWNERS</div>
          </div>
          <div className="percent montserrat-extra-bold-purple-heart-40px">10%</div>
          <div className="overlap-group5">
            <div className="rectangle-30" />
            <div className="rectangle-15" />
            <div className="text-9 montserrat-extra-bold-purple-heart-20px">
              MERCH STORE GOES LIVE<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAS YOUR BEAR HOLDING
              0.25ETH?&nbsp;&nbsp;4 WINNERS DRAWN
            </div>
            <div className="percent-1 montserrat-extra-bold-purple-heart-40px">25%</div>
            <img className="mask-group-8" src={images["mask-group-8@1x.png"].default} />
          </div>
          <div className="overlap-group9">
            <div className="rectangle-29" />
            <div className="rectangle-17" />
            <div className="text-10 montserrat-extra-bold-purple-heart-20px">
              SURPRISE TRAIT UTILITIES UNLOCKED<br />COLLABORATION TRAITS UNLOCKED
            </div>
            <div className="percent-2 montserrat-extra-bold-purple-heart-40px">50%</div>
            <img className="mask-group-7" src={images["mask-group-7@1x.png"].default} />
          </div>
          <div className="overlap-group14">
            <div className="breeding-cards montserrat-extra-bold-purple-heart-20px">BREEDING CARDS</div>
            <div className="overlap-group16"><img className="mask-group-6" src={images["mask-group-6@1x.png"].default} /></div>
          </div>
          <div className="percent-3 montserrat-extra-bold-purple-heart-40px">75%</div>
          <div className="overlap-group11">
            <div className="rectangle-28" />
            <div className="rectangle-22" />
            <div className="text-11">
              $ TOKEN TIME&nbsp;&nbsp;|&nbsp;&nbsp;STAKING FOR DAO |&nbsp;&nbsp;BARELY BEARS STUDIOS IS FOUNDED
            </div>
            <img className="mask-group-5" src={images["mask-group-5@1x.png"].default} />
          </div>
          <div className="flex-row">
            <div className="percent-4 montserrat-extra-bold-purple-heart-40px">100%</div>
            <img className="path-127" src={images["path-127@1x.png"].default} />
          </div>
          <div className="overlap-group19">
            <div className="overlap-group13">
              <img className="group-23" src={images["group-23@1x.png"].default} />
              <div className="each-of-our-hand-dra">
                Each Of Our Hand Drawn Traits Have Their Own % Chance Of Spawning On Your Bear, From Common To Uncommon
                Through To Rare, Legendary And Even A Handful Of 1/1 Traits<br /><br />we’ve Had A Lot Of Fun
                Brainstorming Utility Ideas That Unlock On 100% Sell Out Of The Project. From Basic Free Pizza For Pizza
                Trait Bears Through To Collaborative Assets With Some Of Our Favourite Projects Where Owning That Asset
                Unlocks A Raffle To Win An Og Piece From That Collection…
              </div>
              <img className="x169" src={images["169@1x.png"].default} />
              <img className="x180" src={images["180@1x.png"].default} />
              <img className="x271" src={images["271@1x.png"].default} />
              <img className="x234" src={images["234@1x.png"].default} />
            </div>
            <div className="overlap-group8">
              <div className="group-24">
                <div className="overlap-group2">
                  <img className="path-29-2" src={images["path-29-6@1x.png"].default} />
                  <img className="path-30-2" src={images["path-30-6@1x.png"].default} />
                  <img className="path-31-2" src={images["path-31-6@1x.png"].default} />
                  <img className="path-32-2" src={images["path-32-6@1x.png"].default} />
                </div>
              </div>
              <div className="text-8">
                WITH OVER 350 DIFFERENT ASSETS, EVERY BARELY BEAR HAS THEIR OWN STYLE<br />BUT SOME TRAITS ARE RARER THAN
                OTHERS
              </div>
              <div className="rectangle-33" />
              <div id="RarityTag" className="rarity asphalt-black-white-94px">RARITY</div>
              <img className="path-125" src={images["path-125@1x.png"].default} />
              <img className="path-126" src={images["path-126@1x.png"].default} />
            </div>
          </div>
          <div className="overlap-group6 montserrat-semi-bold-ice-cold-25px">
            <div className="rectangle-6" />
            <img className="group-21" src={images["group-21@1x.png"].default} />
            <div className="overlap-group4">
              <div id="TeamTag" className="the-team asphalt-black-white-94px">THE TEAM</div>
              <img className="path-27" src={images["path-27@1x.png"].default} />
              <img className="path-28" src={images["path-28@1x.png"].default} />
            </div>
            <div className="text-4">
              <span className="montserrat-extra-bold-ice-cold-25px">ORI<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">The best person in the entire universe.  Ori was created by a spiritual higher being that came to earth on a camping trip.  Forgotten beyond time, he quickly adjusted to popular culture and behavior, in the process he created the Barely Bears universe
              </span>
            </div>
            <div className="james-buying-bear-0">
              <span className="montserrat-extra-bold-ice-cold-25px">JAMES<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Buying Bear #023 back in May, James spotted the Bear’s Discord link<br />on Twitter was broken. one DM
                led to a few then a zoom call,<br />fast forward 100s of hours planning roadmaps,<br />utility and
                marketing and James is BB project manger.<br />Regularly working 17h shifts in his hospitality day job,<br />he’s
                our nocturnal Bear slamming caffeine &amp; keyboards</span>
            </div>
            <div className="text-5">
              <span className="montserrat-extra-bold-ice-cold-25px">AMIR<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Among friends, Amir is referred as 'The Bear'! Product manager at day and hectic developer at night. With over 5 years in the crypto industry, Amir is here for the long run </span>
            </div>
            <div className="group-9" />
            <div className="group-12" />
            <div className="group-13" />
            <div className="text-6">
              <span className="montserrat-extra-bold-ice-cold-25px">INBAL<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Living in Tel Aviv, Inbal is an independent animator & illustrator with a over a decade of experience in the industry.</span>
            </div>
            <div className="group-15" />
            <div className="text-7">
              <span className="montserrat-extra-bold-ice-cold-25px">YAIR<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Ori’s best friend since high school!
              and a graphic designer with over 10 years experience in branding, gaming products design and illustration.</span>
            </div>
            <div className="group-14" />
          </div>
          <div id="FAQTag" className="faq-1">FAQ</div>
          <div className="overviewour-10k-col" style={{ width: '1200px'}}>
            <span className="montserratalternates-semi-bold-gossamer-25px"><u>Overview</u><br /><br />Our 10k collection will launch on this very site in December<br />- 10,000 pieces<br />- 0.05
              ETH + gas to mint<br />- IP is open for holders<br />- Public mint transaction limit set to 10tokens<br /><br />
              How does your OG collection tie into your 10k?<br />Barely Bears was started
              back in May 2021 with 1/1 artwork and airdrops for the community.&nbsp;&nbsp;<br /><br />All tokens from our
              OG Collection grant whitelist for 2 mints while our 110 OG Bears also grant a free mint (you only pay
              gas).&nbsp;&nbsp;<br /><br /><br />
              <u>Official OpenSea links:</u><br /><br />
              - <a href="https://opensea.io/collection/barely-bears-1?search[chains][0]=ETHEREUM&amp;search[sortAscending]=true&amp;search[sortBy]=PRICE">1/1 OG Bears </a>
              <br />- <a href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/109680211364835640009503122431304661144065192008992185677036744301032092205155">1/99 Bear #100</a>
              <br />- <a href="https://opensea.io/collection/barely-bear-events">Halloween Special</a> 
              <br />- <a href="https://opensea.io/collection/the-honeypot-club">Secret</a><br /><br />
              <u>How will whitelist work?</u><br /><br />We hate gas wars, to ensure a fair drop &amp; minimise wasted gas
              money, we’re splitting the drop into 3 parts<br />- 72h for OG holders to claim their free (plus gas)
              mint<br />- 72h whitelist for OG holders &amp; competition winners to mint<br />- Public mint opens
              <br /><br />
              <u>How can I join the community?</u><br /><br />Jump into our <a href="discord.gg/M2wpH2BpbA">Discord</a> - we’ve got
              regular competitions, games and private channels for collectors to spit that alpha. Feel free to ask us
              anything in general chat!&nbsp;&nbsp;<br /><br />Throw us a GM on <a href="https://twitter.com/BearsAreBarely">Twitter</a> - and be prepared for a few follow trains<br /><br />
              <u>What happens after the 10k?</u><br /><br />Check out our goals for % completion of the 10k. Once the 10k sells out, we’re full steam
              ahead on Phase 3, there might be a few clues on our island map!</span>
              </div>
        </div>
      </div>
    </div>
  );
}

export default App;