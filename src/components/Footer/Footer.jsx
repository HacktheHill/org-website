import { faFacebook, faInstagram, faLinkedin, faMedium, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.css";
import FooterLogo from "/Logos/hackthehill-banner.svg";

function Footer() {
	return (
		<div className="Footer">
			<div className="FooterBody">
				<div className="FooterLogo">
					<img src={FooterLogo} alt="Logo" />
				</div>
				<div className="LogoText">
					<p>Canada's Capital Hackathon</p>
				</div>
				<div className="FooterContainer">
					<div className="MediaLinks">
						<a
							href="https://www.facebook.com/canadascapitalhackathon"
							target="_blank"
							rel="noreferrer"
							aria-label="Facebook">
							<Icon icon={faFacebook} />
						</a>
						<a href="https://twitter.com/hackthehiII" target="_blank" rel="noreferrer" aria-label="Twitter">
							<Icon icon={faTwitter} />
						</a>
						<a
							href="https://www.instagram.com/hackthehill/"
							target="_blank"
							rel="noreferrer"
							aria-label="Instagram">
							<Icon icon={faInstagram} />
						</a>
						<a
							href="https://www.tiktok.com/@hackthehill"
							target="_blank"
							rel="noreferrer"
							aria-label="TikTok">
							<Icon icon={faTiktok} />
						</a>
						<a
							href="https://www.linkedin.com/company/hackthehill/"
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn">
							<Icon icon={faLinkedin} />
						</a>
						<a
							href="https://www.medium.com/@hackthehill"
							target="_blank"
							rel="noreferrer"
							aria-label="Medium">
							<Icon icon={faMedium} />
						</a>
					</div>
				</div>
				<div className="FooterText">
					<p>Control the Capital, Command the Cabinet, Build until you Hack the Hill</p>
					<small>&copy; 2022-2023 Hack the Hill</small>
				</div>
			</div>
		</div>
	);
}

export default Footer;