import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import './css/globals.css'
import './css/styleguide.css'
import './css/web-1920-1.css'

function App() {

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./img', false, /\.png/));

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
                  <div className="about-us montserratalternates-semi-bold-white-25px">About us</div>
                </div>
                <div className="component-15-1">
                  <div className="road-map montserratalternates-semi-bold-white-25px">Road Map</div>
                </div>
                <div className="component-14-1">
                  <div className="goa-ls montserratalternates-semi-bold-white-25px">Goals</div>
                </div>
                <div className="component-13-1">
                  <div className="r-arity montserratalternates-semi-bold-white-25px">Rarity</div>
                </div>
                <div className="component-12-1"><div className="team montserratalternates-semi-bold-white-25px">Team</div></div>
                <div className="component-11-1"><div className="faq montserratalternates-semi-bold-white-25px">FAQ</div></div>
              </div>
              <div className="group-4"><img className="union-7" src={images["union-7@1x.png"].default} /></div>
              <div className="minted-25">MINTED 25%</div>
              <div className="about-us-1">ABOUT US</div>
              <img className="path-22" src={images["path-22@1x.png"].default} />
              <img className="path-23" src={images["path-23@1x.png"].default} />
              <img className="path-25" src={images["path-24@1x.png"].default} />
              <img className="path-24" src={images["path-25@1x.png"].default} />
              <img className="path-26" src={images["path-26@1x.png"].default} />
              <div className="component-17-1">
                <div className="overlap-group3">
                  <div className="group-7" />
                  <div className="group-6">
                    <div className="mask-group-1">
                      <div className="group-5">
                        <div className="overlap-group-1">
                          <img className="path-12" src={images["path-12-1@1x.png"].default} />
                          <img className="path-15" src={images["path-12-1@1x.png"].default} />
                          <img className="path-14" src={images["path-12-1@1x.png"].default} />
                          <img className="path-132" src={images["path-12-1@1x.png"].default} />
                          <img className="path-134" src={images["path-12-1@1x.png"].default} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="connectwallet">CONNECT<br />WALLET</div>
                </div>
              </div>
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
              <div className="road-map-1 asphalt-black-white-94px">ROAD MAP</div>
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
          <div className="component-9-1">
            <div className="group-25" />
          </div>
          <div className="component-10-1">
            <div className="group-28" />
          </div>
          <div className="overlap-group15">
            <div className="text-3">GOALS FOR<br />COMPLITION</div>
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
              <div className="rarity asphalt-black-white-94px">RARITY</div>
              <img className="path-125" src={images["path-125@1x.png"].default} />
              <img className="path-126" src={images["path-126@1x.png"].default} />
            </div>
          </div>
          <div className="overlap-group6 montserrat-semi-bold-ice-cold-25px">
            <div className="rectangle-6" />
            <img className="group-21" src={images["group-21@1x.png"].default} />
            <div className="overlap-group4">
              <div className="the-team asphalt-black-white-94px">THE TEAM</div>
              <img className="path-27" src={images["path-27@1x.png"].default} />
              <img className="path-28" src={images["path-28@1x.png"].default} />
            </div>
            <div className="text-4">
              <span className="montserrat-extra-bold-ice-cold-25px">ORI<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Professional animator living in Israel for the past xxx years.<br />Ori created Barely Bear back in May
                2021,<br />listing it in May for 0.01.&nbsp;&nbsp;Addicted to cartoons and animation,<br />Ori’s end goal
                is Barely Bear Studios</span>
            </div>
            <div className="james-buying-bear-0">
              <span className="montserrat-extra-bold-ice-cold-25px">JAMES<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Buying Bear #023 back in May, James spotted the Bear’s Discord link<br />on Twitter was broken. one DM
                led to a few then a zoom call,<br />fast forward 100s of hours planning roadmaps,<br />utility and
                marketing and James is BB project manger.<br />Regularly working 17h shifts in his hospitality day job,<br />he’s
                our nocturnal Bear slamming caffeine &amp; keyboards</span>
            </div>
            <div className="text-5">
              <span className="montserrat-extra-bold-ice-cold-25px">AMIR<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Professional animator living in Israel for the past xxx years.<br />Ori drew the first Barely Bear back
                in March 2021,<br />listing it in May for 0.01.&nbsp;&nbsp;Addicted to cartoons and animation,<br />Ori’s
                end goal is Barely Bear Studios</span>
            </div>
            <div className="group-9" />
            <div className="group-12" />
            <div className="group-13" />
            <div className="text-6">
              <span className="montserrat-extra-bold-ice-cold-25px">INBAL<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Professional animator living in Israel for the past xxx years.<br />Ori drew the first Barely Bear back
                in March 2021,<br />listing it in May for 0.01.&nbsp;&nbsp;Addicted to cartoons and animation,<br />Ori’s
                end goal is Barely Bear Studios</span>
            </div>
            <div className="group-15" />
            <div className="text-7">
              <span className="montserrat-extra-bold-ice-cold-25px">YAIR<br /></span><span className="montserratalternates-semi-bold-ice-cold-25px">Professional animator living in Israel for the past xxx years.<br />Ori drew the first Barely Bear back
                in March 2021,<br />listing it in May for 0.01.&nbsp;&nbsp;Addicted to cartoons and animation,<br />Ori’s
                end goal is Barely Bear Studios</span>
            </div>
            <div className="group-14" />
          </div>
          <div className="faq-1">FAQ</div>
          <div className="overviewour-10k-col">
            <span className="montserratalternates-semi-bold-gossamer-25px">Overview<br />Our 10k collection will launch on this very site in December<br />- 10,000 pieces<br />- 0.05
              ETH + gas to mint<br />- IP is open for holders<br />- Public mint transaction limit set to 10
              tokens&nbsp;&nbsp;<br /><br />How does your OG collection tie into your 10k?<br />Barely Bears was started
              back in May 2021 with 1/1 artwork and airdrops for the community.&nbsp;&nbsp;<br /><br />All tokens from our
              OG Collection grant whitelist for 2 mints while our 110 OG Bears also grant a free mint (you only pay
              gas).&nbsp;&nbsp;<br /><br />Official OpenSea links:<br />1/1 OG Bears - </span><span className="montserratalternates-black-gossamer-25px">https://opensea.io/collection/barely-bears-1?search[chains][0]=ETHEREUM&amp;search[sortAscending]=true&amp;search[sortBy]=PRICE<br /></span><span className="montserratalternates-semi-bold-gossamer-25px"><br />1/99 Bear #100 - </span><span className="montserratalternates-black-gossamer-25px">https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/109680211364835640009503122431304661144065192008992185677036744301032092205155<br /></span><span className="montserratalternates-semi-bold-gossamer-25px"><br />Halloween Special - </span><span className="montserratalternates-black-gossamer-25px">https://opensea.io/collection/barely-bear-events<br />Secret -
              https://opensea.io/collection/the-honeypot-club<br /></span><span className="montserratalternates-semi-bold-gossamer-25px"><br />How will whitelist work?<br />We hate gas wars, to ensure a fair drop &amp; minimise wasted gas
              money, we’re splitting the drop into 3 parts<br />- 72h for OG holders to claim their free (plus gas)
              mint<br />- 72h whitelist for OG holders &amp; competition winners to mint<br />- Public mint opens
              <br /><br />How can I join the community?<br />Jump into our Discord - discord.gg/M2wpH2BpbA - we’ve got
              regular competitions, games and private channels for collectors to spit that alpha. Feel free to ask us
              anything in general chat!&nbsp;&nbsp;<br /><br />Throw us a GM on Twitter -
              https://twitter.com/BearsAreBarely - and be prepared for a few follow trains<br /><br />What happens after
              the 10k?<br />Check out our goals for % completion of the 10k<br />Once the 10k sells out, we’re full steam
              ahead on Phase 3, there might be a few clues on our island map</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
