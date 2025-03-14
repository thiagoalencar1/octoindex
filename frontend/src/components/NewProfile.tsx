import React, { useState } from 'react'

const NewProfile: React.FC = () => {
  const [url, setUrl] = useState('')

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const apiUrl = `http://localhost:3000/api/v1/github_profiles?url=${encodeURIComponent(url)}`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Response data:', data)

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div>
      <label htmlFor="my_modal_6" className="btn">scrape new github profile</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <form onSubmit={handleSubmit}>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </g>
              </svg>
              <input
                type="url"
                required
                placeholder="https://"
                value={url}
                onChange={handleUrlChange}
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
            </label>
            <p className="validator-hint">Must be valid URL</p>
            <div className="modal-action">
              <button type="submit" className="btn">Submit</button>
              <label htmlFor="my_modal_6" className="btn">Close!</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewProfile
