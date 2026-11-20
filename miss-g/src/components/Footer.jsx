import { site } from '../data/site.js';
import { Wordmark } from './Brand.jsx';

export default function Footer() {
  const { contact, credit } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Wordmark className="footer__wordmark" />
        </div>
        <address className="footer__contact">
          <p>{contact.location}</p>
          <p>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram @{contact.instagramHandle}
            </a>
          </p>
          <p>
            <a href={`tel:+1${contact.phoneRaw}`}>{contact.phoneDisplay}</a>
          </p>
        </address>
        <p className="footer__small">
          &copy; {year} {site.name}.
          {credit?.label && (
            <>
              {' '}
              {credit.url ? (
                <a href={credit.url} target="_blank" rel="noopener noreferrer">
                  {credit.label}
                </a>
              ) : (
                credit.label
              )}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
