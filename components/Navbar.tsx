// components/Navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react'; // Import useState

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faShoppingBag,
    faBars, // Hamburger icon (solid style)
    faTimes // Close icon (solid style)
} from '@fortawesome/free-solid-svg-icons';
import {
    faUser as farUser,
    faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons';

import styles from './Navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const gender = searchParams.get('gender');

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Men', path: '/shop?gender=Men' },
        { name: 'Women', path: '/shop?gender=Women' },
        { name: 'Best Sellers', path: '/best-sellers' },
        { name: 'Fitup', path: '/fitup' },
        { name: 'Brands', path: '/brands' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to close menu when a link is clicked (optional)
    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.navbarBrand}>
                <Image
                    src="/assets/fitup-logo.png"
                    alt="IT FIT UP Uniforms Logo"
                    width={100}
                    height={60}
                    priority
                />
            </Link>

            <ul className={styles.navbarNav}>
                {navLinks.map((link) => {
                    let isActive = pathname === link.path;
                    if (link.name === 'Men' && gender === 'Men') isActive = true;
                    if (link.name === 'Women' && gender === 'Women') isActive = true;
                    return (
                        <li
                            key={link.name}
                            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        >
                            <Link href={link.path} className={styles.navLink}>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.navbarIcons}>
                <Link href="/account" className={styles.iconLink}>
                    <FontAwesomeIcon icon={farUser} />
                </Link>
                <Link href="/search" className={styles.iconLink}>
                    <FontAwesomeIcon icon={faSearch} />
                </Link>
                <Link href="/wishlist" className={styles.iconLink}>
                    <FontAwesomeIcon icon={farHeart} />
                </Link>
                <Link href="/cart" className={`${styles.iconLink} ${styles.cartIcon}`}>
                    <FontAwesomeIcon icon={faShoppingBag} />
                    <span className={styles.cartCount}>0</span>
                </Link>

                {/* Hamburger menu icon */}
                <div className={styles.hamburgerMenu} onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                </div>
            </div>

            {/* Mobile Menu Overlay with Transitions */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ''}`}>
                <div className={styles.mobileMenuCloseIcon} onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                {navLinks.map((link) => {
                    let isActive = pathname === link.path;
                    if (link.name === 'Men' && gender === 'Men') isActive = true;
                    if (link.name === 'Women' && gender === 'Women') isActive = true;
                    return (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`${styles.mobileMenuLink} ${isActive ? styles.navItemActive : ''}`}
                            onClick={handleNavLinkClick}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;