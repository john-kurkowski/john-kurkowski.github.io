import React from 'react'

import Layout from 'src/components/layouts/base'
import styles from './hire.module.css'

const page = {
  dateForMeta: '',
  description: '',
  title: 'Hire',
  url: '/hire'
}

export default class Hire extends React.Component {
  constructor () {
    super(...arguments)

    this.state = {
      isLoading: false,
      isSuccess: undefined
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit (e) {
    e.preventDefault()

    this.setState({
      isLoading: true,
      isSuccess: undefined
    })

    const body = new URLSearchParams(new FormData(e.target))
    const url = '/'

    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })

    try {
      const resp = await fetch(url, { body, method: 'post' })
      if (resp.ok) {
        this.setState({ isSuccess: true })
        return
      }
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
    } finally {
      this.setState({ isLoading: false })
    }

    this.setState({ isSuccess: false })
  }

  render () {
    let alertBanner
    if (this.state.isSuccess === true) {
      alertBanner = (
        <div
          className={`bg-blue-100 border-secondary mt-4 text-secondary ${styles.alert}`}
        >
          Got your message. Thank you. Talk to you soon.
        </div>
      )
    } else if (this.state.isSuccess === false) {
      alertBanner = (
        <div
          className={`bg-red-100 border-red-500 mt-4 text-red-700 ${styles.alert}`}
        >
          Sorry. Something went wrong. Try again later.
        </div>
      )
    }

    return (
      <Layout page={page}>
        <section>
          <h2 className='heading text-3xl'>Hire</h2>

          <p className='mt-4'>
            Let's talk about your UX team or legacy project. I respond within 24
            business hours.
          </p>

          <div aria-live='polite' role='alert'>
            {alertBanner}
          </div>

          {!this.state.isSuccess && (
            <form
              data-netlify='true'
              data-netlify-honeypot='threader'
              name='contact'
              onSubmit={this.onSubmit}
            >
              <label className='block mt-8'>
                <span className={styles.label}>Your Name</span>
                <input
                  className={`block w-full ${styles.input}`}
                  disabled={this.state.isLoading}
                  name='name'
                  required
                  type='text'
                />
              </label>

              <label className='block mt-8'>
                <span className={styles.label}>Your Email</span>
                <input
                  className={`block w-full ${styles.input}`}
                  disabled={this.state.isLoading}
                  name='email'
                  required
                  type='email'
                />
              </label>

              <label className='block mt-8'>
                <span className={styles.label}>Tell me about your project</span>
                <textarea
                  className={`block h-32 w-full ${styles.input}`}
                  disabled={this.state.isLoading}
                  name='message'
                  required
                />
              </label>

              <input name='form-name' type='hidden' value='contact' />

              <div className='text-right'>
                <button
                  className={`btn mt-8 ${this.state.isLoading &&
                    'opacity-50 cursor-wait'}`}
                  disabled={this.state.isLoading}
                  type='submit'
                >
                  Let's Talk
                </button>
              </div>
            </form>
          )}
        </section>
      </Layout>
    )
  }
}
