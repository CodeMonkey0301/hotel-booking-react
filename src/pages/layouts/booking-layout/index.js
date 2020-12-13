import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../../components/Footer/index';
import Header from '../../../components/Header/index';
import Reservation from '../../../components/Reservation/index';
import Search from '../../../components/Search/index';
import { DiscountProvider } from '../../../store/DiscountContext';
import { RoomProvider } from '../../../store/RoomContext';
import { SearchProvider } from '../../../store/SearchContext';
import './style.scss';

function BookingLayout(props) {
    const [discount, setDiscount] = useState(0);
    const path = useLocation().search;
    let bookingStep = 1;

    useEffect(() => {
        if (path) {
            const promo_code = path.match(/promo_code=\d{1,3}/ig);
            if (promo_code) {
                setDiscount(parseInt(promo_code[0].split("=")[1]));
            }
        }
        console.log(discount);
    }, []);

    return (
        <DiscountProvider initVal={discount}>
        <SearchProvider>
            <RoomProvider>
                <div className='app'>
                    <Header />
                    <Search />
                    <div className='container'>
                        <div className='row'>
                            <main className='col-md-8'>
                                <section className='mb-5 mt-5 ml-2'>
                                    <h1>Rooms & Rates</h1>
                                    <p>Plan your perfect stay at our hotel</p>
                                    <img src={`/images/book-steps-${bookingStep}.png`} alt='' className='booking-step' />
                                </section>
                                {props.children}
                            </main>
                            <aside className='col-md-4'>
                                <section className='mb-4'>
                                    <img src='/images/coco-drink.png' width='300' alt='' />
                                    <h2 className='text-uppercase font-weight-bold'>TODAY ONLY: 10% OFF</h2>
                                    <p>Book <span className='text-underline'>today</span> and get an exclusive <strong>10% discount</strong> on your stay.</p>
                                    <button className='btn btn-primary text-uppercase'>Enjoy</button>
                                </section>
                                <Reservation />
                            </aside>
                        </div>
                    </div>
                    <Footer />
                </div>
            </RoomProvider>
        </SearchProvider >
        </DiscountProvider>
    )
}

export default BookingLayout