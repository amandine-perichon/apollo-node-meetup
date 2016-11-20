import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql'

import db from './db'

const Spacecraft = new GraphQLEnumType({
  name: "Spacecraft",
  values: {
    galactica: {value: "Galactica"},
    zephir: {value: "Zephir"},
    colonialOne: {value: "Colonial One"},
  }
})

const Crew = new GraphQLObjectType({
  name: 'Crew',
  description: 'Crew on a spacecraft',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    spacecrafts: {type: new GraphQLList(Spacecraft)}
  })
})

const Mutation = new GraphQLObjectType({
  name: "CrewMutation",
  description: "Add a new crew",
  fields: () => ({
    createCrew: {
      type: Crew,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)},
        spacecrafts: {type: new GraphQLNonNull(new GraphQLList(Spacecraft))}
      },
      resolve: function(source, args) {
        let newCrew = db.addCrew(args)
        return newCrew
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: "FleetQuery",
  fields: {
    fleet: {
      type: new GraphQLList(Crew),
      args: {
        spacecraft: {
          description: 'Text search per spacecraft',
          type: Spacecraft
        }
      },
      resolve: function(root, params) {
        return db.getFleet(params.spacecraft)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
