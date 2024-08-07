# Bike Shop

This is a Ruby on Rails 7 application with a ReactJS frontend.
For more details visit the application documents.
https://docs.google.com/document/d/1Zd3DQZ6_Jp5rNLjrWhGUlwVOP7NKzDTShZVjdTGQgnI/edit?usp=sharing

## Prerequisites

- Ruby: 3.2.2
- Rails: 7.0.8.4
- Node.js: 18.1.0
- Yarn: 1.22.22

## Installation

### Step 1: Clone the repository

git clone https://github.com/Umersani47/authorization-bike-app.git
cd authorization-bike-app


Using rbenv:

rbenv install 3.2.2
rbenv global 3.2.2

# For install rails setup visit https://gorails.com/setup/ubuntu/24.04

gem install bundler

bundle install

# Install Node.js:

nvm install 18.1.0
nvm use 18.1.0

npm install -g yarn

yarn install

rails db:setup

## To start Rails server
rails server
## To start react frontend
npm run dev

Default Admin user has been created in the seed.rb with some bikes data.
