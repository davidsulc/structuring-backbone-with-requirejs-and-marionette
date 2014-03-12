# encoding: utf-8

class LanguagesController < ApplicationController
  respond_to :json

  def translations
    case params[:language]
    when "en"
      hash = {
        "generic" => {
          "show" => "Show",
          "edit" => "Edit",
          "save" => "Save",
          "delete" => "Delete",
          "remove" => "Remove",
          "changedOnServer" => "This model has changed on the server, and has been updated with the latest data from the server and your changes have been reapplied.",
          "unprocessedError" => "An unprocessed error happened. Please try again!"
        },
        "about" => {
          "title" => "About this application",
          "message" => {
            "design" => "This application was designed to accompany you during your learning.",
            "closing" => "Hopefully, it has served you well !"
          }
        },
        "acquaintance" => {
          "modelName" => "Acquaintance"
        },
        "contact" => {
          "attributes" => {
            "firstName" => "First Name",
            "lastName" => "Last Name",
            "phoneNumber" => "Phone number",
            "acquaintances" => "Acquaintances",
            "strangers" => "Strangers"
          },
          "newContact" => "New contact",
          "editContact" => "Edit this contact",
          "filterContacts" => "Filter contacts",
          "noneToDisplay" => "No contacts to display.",
          "missing" => "This contact doesn't exist !"
        },
        "loading" => {
          "title" => "Loading Data",
          "message" => "Please wait, data is loading."
        }
      }
    when "fr"
      hash = {
        "generic" => {
          "show" => "Afficher",
          "edit" => "Modifier",
          "save" => "Enregistrer",
          "delete" => "Supprimer",
          "remove" => "Retirer",
          "changedOnServer" => "Ce modèle a été modifié sur le serveur, a été mis à jour avec les données les plus récentes provenant du serveur, et vos modifications ont été réappliquées.",
          "unprocessedError" => "Une erreur indéterminée est survenue. Veuillez essayer à nouveau !"
        },
        "about" => {
          "title" => "Concernant cette application",
          "message" => {
            "design" => "Cette application a été conçue pourv ous accompagner au long de votre apprentissage.",
            "closing" => "J'espère qu'elle vous a bien servi !"
          }
        },
        "acquaintance" => {
          "modelName" => "Connaissance"
        },
        "contact" => {
          "attributes" => {
            "firstName" => "Prénom",
            "lastName" => "Nom",
            "phoneNumber" => "Numéro de téléphone",
            "acquaintances" => "Connaissances",
            "strangers" => "Inconnus"
          },
          "newContact" => "Nouveau contact",
          "editContact" => "Modifier ce contact",
          "filterContacts" => "Filtrer les contacts",
          "noneToDisplay" => "Pas de contacts à afficher",
          "missing" => "Ce contact n'existe pas !"
        },
        "loading" => {
          "title" => "Chargement des données",
          "message" => "Veuillez patienter, les données sont en train d'être chargées."
        }
      }
    end

    respond_with(hash.to_json)
  end
end
