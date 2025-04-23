import React from 'react'
import style from './Order.module.scss'
import { MdOutlineMessage } from "react-icons/md";


const Order = () => {
    return (
        <div className={style.section}>

            <div className={style.container}>

                <div className={style.order}>  
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                        <path d="M502.6 124.9L261.2 4.2c-3.3-1.6-7.1-1.6-10.4 0L9.4 124.9c-4 2-6.4 6-6.4 10.4v241.4c0 4.5 2.4 8.5 6.4 10.5l241.4 120.7c1.6 0.8 3.4 1.2 5.2 1.2s3.6-0.4 5.2-1.2l241.4-120.7c4-2 6.5-6 6.4-10.4V135.3c0-4.4-2.5-8.4-6.4-10.4zM471.4 135.3L256 243l-60.8-30.4 208.9-111 67.3 33.7zM126.2 178.1l208.9-111 43.4 21.7-208.9 111-43.4-21.7zM100.8 284.8h29.7l31.1 31.1c2.2 2.2 5.1 3.4 8.2 3.4s6-1.2 8.2-3.4c2.2-2.2 3.4-5.1 3.4-8.2v-76l63 31.5v215.4L26.2 369.5V154.1l63 31.5v87.6c0 5.4 5.2 10.6 11.6 10.6zM158.2 279.6L143.5 265c-2.2-2.2-5.1-3.4-8.2-3.4h-22.9v-64.4l45.7 22.9v59.5zM40.6 135.3L256 27.6l53.6 26.7-208.9 111-60.1-30.1zM485.8 154.1v215.4L267.6 478.6V263.2L485.8 154.1z" fill="#fff" />
                    </svg>
                    <div className={style.title}>
                        <span>FREE DELIVERY</span>
                        <span>For all orders over $120</span>
                    </div>
                  
                </div>

                <div className={style.order}>
                <MdOutlineMessage className={style.icon} />
                <div className={style.title}>
                        <span>24/7 HELP CENTER</span>
                        <span>Dedicated 24/7 support</span>
                    </div>
              
                </div>
                
                <div className={style.order}>
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                        <path d="M510.8,298.6c0,98.5-79.9,178.4-178.4,178.4H29v-35.7h303.3c78.8,0,142.7-63.9,142.7-142.7s-63.9-142.7-142.7-142.7H78.3 l69.2,57.6l-22.8,27.5L1.2,138L124.7,35l22.8,27.5l-69.2,57.6h254.1C430.9,120.1,510.8,200,510.8,298.6z" fill="#fff" />
                    </svg>
                    <div className={style.title}>
                        <span>SATISFIED OR REFUNDED</span>
                        <span>Free returns within 14 days</span>
                    </div>
                </div>
                <div className={style.order}>
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                        <path d="M496,319.996c-8.832,0-16,7.168-16,16v112H32v-192h176c8.832,0,16-7.168,16-16c0-8.832-7.168-16-16-16H32v-64h176 c8.832,0,16-7.168,16-16c0-8.832-7.168-16-16-16H32c-17.664,0-32,14.336-32,32v288c0,17.664,14.336,32,32,32h448 c17.664,0,32-14.336,32-32v-112C512,327.164,504.832,319.996,496,319.996z" fill="#ffffff"/>
                        <path d="M144,319.996H80c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16 C160,327.164,152.832,319.996,144,319.996z" fill="#ffffff"/>
                        <path d="M502.304,81.276l-112-48c-4.064-1.696-8.576-1.696-12.64,0l-112,48c-5.856,2.528-9.664,8.32-9.664,14.72v64 c0,88.032,32.544,139.488,120.032,189.888c2.464,1.408,5.216,2.112,7.968,2.112s5.504-0.704,7.968-2.112 C479.456,299.612,512,248.156,512,159.996v-64C512,89.596,508.192,83.804,502.304,81.276z M480,159.996 c0,73.888-24.448,114.56-96,157.44c-71.552-42.976-96-83.648-96-157.44v-53.44l96-41.152l96,41.152V159.996z" fill="#ffffff"/>
                        <path d="M442.016,131.484c-6.88-5.44-16.928-4.384-22.496,2.496l-50.304,62.912l-19.904-29.76 c-4.96-7.36-14.912-9.312-22.176-4.448c-7.328,4.896-9.344,14.848-4.448,22.176l32,48c2.848,4.256,7.52,6.88,12.64,7.136 c0.224,0,0.48,0,0.672,0c4.832,0,9.44-2.176,12.512-6.016l64-80C450.016,147.068,448.928,137.02,442.016,131.484z" fill="#ffffff"/>
                        </svg>
                    <div className={style.title}>
                        <span>100% SECURE PAYMENTS</span>
                        <span>Accept all payment methods</span>
                    </div>
                </div>
             

            </div>
        </div>
    )
}

export default Order