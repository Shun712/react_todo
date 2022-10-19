Rails.application.routes.draw do
  get "tasks", to: "tasks#index"
  post "tasks", to: "tasks#create"
  delete "tasks/:id", to: "tasks#destroy"
end
