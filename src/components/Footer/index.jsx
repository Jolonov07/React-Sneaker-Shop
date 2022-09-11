import style from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <section className={style.footer_df}>
        <div>
          © 2022 «Zholonov»
        </div>
        <div>
          Contact
        </div>
      </section>
    </footer>
  )
}

export default Footer
