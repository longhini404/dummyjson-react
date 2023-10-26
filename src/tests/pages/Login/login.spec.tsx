import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import faker from 'faker'
import { Provider } from 'react-redux'
import { Login } from 'pages'
import { store } from 'core/store'

const mockAuthentication = jest.fn()

function renderLoginComponent() {
  return render(
    <Provider store={store}>
      <Router>
        <Login authentication={{ auth: mockAuthentication }} />
      </Router>
    </Provider>
  )
}

test('renders Login component with fake data', async () => {
  const { getByTestId } = renderLoginComponent()

  const fakeUsername = faker.internet.userName()
  const fakePassword = faker.internet.password()

  const usernameInput = getByTestId('username-input')
  const passwordInput = getByTestId('password-input')
  const submitButton = getByTestId('submit-button')

  fireEvent.change(usernameInput, { target: { value: fakeUsername } })
  fireEvent.change(passwordInput, { target: { value: fakePassword } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockAuthentication).toHaveBeenCalledWith({
      username: fakeUsername,
      password: fakePassword,
    })
  })
})
