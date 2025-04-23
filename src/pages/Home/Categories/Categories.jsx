import React from 'react'
import style from './Categories.module.scss'
import gb1 from '../../../assets/categories1.jpg'
import gb2 from '../../../assets/gb2.jpg'
import gb3 from '../../../assets/gb3.jpg'
import gb4 from '../../../assets/gb4.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className={style.container}>
            <div className={style.sectitle}>
                <h3 className={style.subtitle} >
                    There's More to Explore
                </h3>
            </div>
            <div className={style.items}>


                <div className={style.item}>
                    <Link>
                        <img className={style.catitem} src={gb1} alt="" />
                        <button>
                            Women
                        </button>
                    </Link>
                </div>
                <div className={style.item}>
                    <Link>
                        <img className={style.catitem} src={gb2} alt="" />
                        <button>
                            Men
                        </button>
                    </Link>
                </div>
                <div className={style.item}>
                    <div>
                        <Link>
                            <img className={style.product} src={gb3} alt="" />
                            <button>
                                Shoes
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link>
                            <img className={style.product} src={gb4} alt="" />
                            <button>
                                Accessories
                            </button>
                        </Link>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Categories