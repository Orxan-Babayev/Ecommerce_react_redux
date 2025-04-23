import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NewArrivals.module.scss'
import product1 from '../../../assets/product1.jpg'
import product2 from '../../../assets/product2.jpg'
import product3 from '../../../assets/product3.jpg'
import product4 from '../../../assets/product4.jpg'
import product5 from '../../../assets/product5.jpg'
import product6 from '../../../assets/product6.jpg'
import product7 from '../../../assets/product7.jpg'
import product8 from '../../../assets/product8.jpg'

const NewArrivals = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h3 className={styles.main}> New Arrivals </h3>
            <p>We have your occasion covered</p>
        </div>
        <div className={styles.items}>
            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product1} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product2} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Long Maxi Dress</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>
            
            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product3} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Solid Cargo Pant</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product4} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product5} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product6} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product7} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div>

            <div className={styles.item}>
                <Link>
                <div>
                    <img className={styles.img} src={product8} alt="" />
                    <div> </div>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                    <span className={styles.price}>$180.00</span>
                    <ul></ul>
                </div>
                </Link>
            </div> 

        </div>
        <button className={styles.button}>
            Discover More
        </button>

    </div>
 

  )
}

export default NewArrivals
