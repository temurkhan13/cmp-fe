import React from 'react'
import { teamslide1, teamslide2, video } from '../../../assets'
import { FaArrowRight } from 'react-icons/fa'

const Team = () => {
  return (
    <div className='team'>
      <h1>An <span className='text-gradient'>END-TO-END</span> business <br /> platform for your team</h1>
      <div className='both'>
        <div>
            <img width={'100%'} src={video} alt="" />
        </div>
        <div className='slide flex flex-col'>
            <div className='div1'>
                <button><FaArrowRight className='rotateIcon'/></button>
                <h2>4x your data response rate <br/> with generative AI and instant <br/> output formats.</h2>
            </div>
            <div className='div2'>
                <h2><img src={teamslide1} alt="" /></h2>
                <h2><img src={teamslide2} alt="" /></h2>
                <h2><img src={teamslide1} alt="" /></h2>
            </div>
        </div>
      </div>
      <style>
        {`
        .team{
        margin-top: 50px;
        }
        .team h1{
        font-size: 40px;
        font-weight: 600;
        line-height: 48.41px;
        text-align: center;
        }
        .team h1 span{
        font-size:48px;
        }
        .team .both{
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 50px 0;
        }

        @media (min-width: 360px){
        .team .both{
        flex-direction: column;
        }
        }

        @media (min-width: 768px){
        .team .both{
        flex-direction: column;
        }
        }
        @media (min-width: 1024px){
        .team .both{
        flex-direction: row;
        }
        }

        .slide .div1{
        background-color: white;
        border-radius:30px;
        padding: 20px;
        height: 80%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
          }
          .slide button{
          background-color: #C3E11D;
          border-radius: 9999px;
          padding: 10px 12px;
          position: absolute;
          border: none;
          right: 15px;
          top: 15px;
          }
          .slide button i{
          rotate: -50deg;
          font-size: 30px;
          color: white;
          }
          .div1 h2{
          font-size: 35px;
          }
          .div2{
          display:flex;
          justify-content: space-between;
          align-items: center;
          justify-items: center;
          padding: 10px;
          border-radius: 999px;
          background-color: #e4e4e4;
          }
          .div2 h2{
          display:flex;
          align-items: center
          }
          .slide{
          display:flex;
          flex-direction: column;
          gap: 30px;
          }
          .rotateIcon{
          rotate: -50deg;
          color: white;
          font-size:20px;
          }

        `}
      </style>
    </div>
  )
}

export default Team
