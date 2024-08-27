import React from 'react'

const Account = () => {
  return (
    <div className='payment-section'>
      <div className='table'>
        <section>
            <h1>Account information</h1>
            <h3 style={{color: 'blue', cursor: 'pointer'}}>Change payment details</h3>
        </section>
        <div style={{display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '20px'}}>
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                <h3>Account title</h3>
                <h3>Account type</h3>
                <h3>Account number</h3>
            </div>
            <div style={{display: 'flex',justifyContent: 'space-between', width: '70%'}}>
                <h2>Micheal Jack</h2>
                <h2>Visa</h2>
                <h2>2321 **** **** ****</h2>
            </div>
        </div>
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                <h3>CVC</h3>
                <h3>Bank Address</h3>
            </div>
            <div style={{display: 'flex',justifyContent: 'space-between', width: '70%'}}>
                <h2>***</h2>
                <h2>4517 Washington Ave. Manchester, Kentucky 39495</h2>
            </div>
        </div>
        </div>
      </div>
      <div style={{width: '33%', border: '1px solid black', borderRadius: '20px', padding: '20px'}}>
        <h1 style={{fontSize: '25px'}}>Selected Plan</h1>
        <h3 style={{fontSize: '15px', color: 'grey', margin: '20px 0'}}>Free</h3>
        <button style={{padding: '10px 15px', borderRadius: '10px', border: 'none', backgroundColor: '#C3E11D', margin: '30px 0 0 0'}}>Upgrade Plan</button>
      </div>
      <style>
        {`
        .payment-section{
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 25px;
        }
        .table{
        border: 1px solid black;
        border-radius: 20px;
        padding: 20px;
        width: 67%;
        }
        .table > section > h1{
        font-size:30px;
        }
        .table > section{
        display: flex;
        justify-content: space-between;
        align-items: center;
        }
        `}
      </style>
    </div>
  )
}

export default Account
