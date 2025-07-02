
import { useParams } from 'react-router-dom';
import TabDetail from './TabMenu';
import styles from './styles.module.css'
function ProductDetailPage() {
    const { slug } = useParams();
    return (
        <div className={styles.detailtContainer}>
            <TabDetail />
            <div className={styles.detailtProductContainer}>
                <div className={styles.detailtProduct_overall}>
                    <div className={styles.detaiProduct_image}>
                        <img src='https://khoahocgiasieure.com/storage/aio.jpg' alt="image about detail book" width={376} height={376} />
                        <img src='https://khoahocgiasieure.com/storage/aio.jpg' alt="image about detail book" className={styles.small_image} />
                    </div>

                    <div className={styles.detailProduct_information}>
                        <h1 className={styles.courseName}>Khóa Học Khoa Học Dữ Liệu Và Trí Tuệ Nhân Tạo AIO AIVIETNAM</h1>
                        <p className={styles.price}>99.000₫ <span className={styles.lineThrought}>25.000.000₫</span></p>

                        <table className={styles.customTtable}>
                            <tr>
                                <td>Thời lượng</td>
                                <td>305 bài giảng</td>
                            </tr>
                            <tr>
                                <td>Sở hữu khoá học</td>
                                <td>Trọn đời</td>
                            </tr>
                        </table>

                        <div className={styles.btn}>
                            <button className={styles.btn_addToCart}>Thêm vào giỏ hàng</button>
                            <button className={styles.btn_buy}>Mua ngay</button>
                        </div>


                    </div>


                </div>


                <div className={styles.detailProdict_descriptionText}>

                </div>

            </div>

        </div>
    )
}

export default ProductDetailPage
