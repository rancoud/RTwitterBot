api = {
  endpoints:[
    {
      method: 'get',
      url: 'statuses/mentions_timeline',
      description: 'Returns the 20 most recent mentions (tweets containing a users’s @screen_name) for the authenticating user. This method can only return up to 800 tweets.',
      parameters: {
        required: [],
        optionnal: [
          'count',
          'since_id',
          'max_id',
          'trim_user',
          'contributor_details',
          'include_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/user_timeline',
      description: 'Returns a collection of the most recent Tweets posted by the user indicated by the screen_name OR user_id parameters. This method can only return up to 3,200 of a user’s most recent Tweets.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'count',
          'since_id',
          'max_id',
          'trim_user',
          'contributor_details',
          'include_rts',
          'exclude_replies'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/home_timeline',
      description: 'Returns a collection of the most recent Tweets and retweets posted by the authenticating user and the users they follow. This method can only return up to 800 tweets.',
      parameters: {
        required: [],
        optionnal: [
          'count',
          'since_id',
          'max_id',
          'trim_user',
          'contributor_details',
          'include_entities',
          'exclude_replies'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/retweets_of_me',
      description: 'Returns the most recent tweets authored by the authenticating user that have been retweeted by others.',
      parameters: {
        required: [],
        optionnal: [
          'count',
          'since_id',
          'max_id',
          'trim_user',
          'include_entities',
          'include_user_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/retweets/:id',
      description: 'Returns a collection of the 100 most recent retweets of the tweet specified by the id parameter.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'status id'
          }
        ],
        optionnal: [
          'count',
          'trim_user'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/show/:id',
      description: 'Returns a single Tweet, specified by the id parameter.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'status id'
          }
        ],
        optionnal: [
          'trim_user',
          'include_my_retweet',
          'include_entities'
        ]
      }
    },
    {
      method: 'post',
      url: 'statuses/destroy/:id',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'statuses/update',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'statuses/retweet/:id',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'statuses/update_with_media',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'statuses/oembed',
      description: 'Returns a single Tweet, specified by either a Tweet web URL OR the Tweet ID, in an oEmbed-compatible format.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'tweet id'
          },
          {
            name: 'url',
            type: 'string',
            description: 'tweet url'
          }
        ],
        optionnal: [
          {
            name: 'maxwidth',
            type: 'int',
            description: 'maximum width of a rendered Tweet: value must be between 220 and 550 inclusive'
          },
          {
            name: 'hide_media',
            type: 'bool',
            description: 'links in a Tweet are not expanded'
          },
          {
            name: 'hide_thread',
            type: 'bool',
            description: 'collapsed version of the previous Tweet in a conversation thread'
          },
          {
            name: 'omit_script',
            type: 'bool',
            description: '<script> responsible for loading widgets.js will not be returned. Your webpages should include their own reference to widgets.js'
          },
          {
            name: 'align',
            type: 'string',
            description: 'Valid values are left, right, center'
          },
          {
            name: 'related',
            type: 'string',
            description: 'a comma-separated list of Twitter usernames related to your content'
          },
          {
            name: 'lang',
            type: 'string',
            description: 'request returned HTML and a rendered Tweet in the specified Twitter language supported by embedded Tweets'
          },
          {
            name: 'widget_type',
            type: 'string',
            description: 'set to video to return a Twitter Video embed for the given Tweet'
          },
          {
            name: 'hide_tweet',
            type: 'bool',
            description: 'applies to video type only: link directly to the Tweet URL instead of displaying a Tweet overlay when a viewer clicks on the Twitter bird logo'
          }
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/retweeters/ids',
      description: 'Returns a collection of up to 100 user IDs belonging to users who have retweeted the tweet specified by the id parameter.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'tweet id'
          }
        ],
        optionnal: [
          'cursor',
          'stringify_ids'
        ]
      }
    },
    {
      method: 'get',
      url: 'statuses/lookup',
      description: 'Returns fully-hydrated tweet objects for up to 100 tweets per request, as specified by comma-separated values passed to the id parameter.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'a comma separated list of tweet IDs, up to 100 are allowed in a single request'
          }
        ],
        optionnal: [
          'include_entities',
          'trim_user',
          'map'
        ]
      }
    },
    {
      method: 'post',
      url: 'media/upload',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'media/upload (chunked)',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'direct_messages/sent',
      description: 'Returns the 20 most recent direct messages sent by the authenticating user. Includes detailed information about the sender and recipient user. You can request up to 200 direct messages per call, up to a maximum of 800 outgoing DMs. This method requires an access token with RWD (read, write & direct message) permissions.',
      parameters: {
        required: [],
        optionnal: [
          'since_id',
          'max_id',
          'count',
          'page',
          'include_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'direct_messages/show',
      description: 'Returns a single direct message, specified by an id parameter. This method requires an access token with RWD (read, write & direct message) permissions.',
      parameters: {
        required: [
          {
            name: 'id',
            type: 'int',
            description: 'ID of the direct message'
          }
        ],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'search/tweets',
      description: 'Returns a collection of relevant Tweets matching a specified query. Not all Tweets will be indexed or made available via the search interface. The search index has a 7-day limit.',
      parameters: {
        required: [
          'q'
        ],
        optionnal: [
          'geocode',
          {
            name: 'lang',
            type: 'string',
            description: 'restricts tweets to the given language, given by an ISO 639-1 code'
          },
          {
            name: 'locale',
            type: 'string',
            description: 'specify the language of the query you are sending (only ja is currently effective)'
          },
          'result_type',
          'count',
          'until',
          'since_id',
          'max_id',
          'include_entities',
          {
            name: 'callback',
            type: 'string',
            description: 'response will use the JSONP format with a callback of the given name'
          }
        ]
      }
    },
    {
      method: 'get',
      url: 'direct_messages',
      description: 'Returns the 20 most recent direct messages sent to the authenticating user. You can request up to 200 direct messages per call, and only the most recent 200 DMs will be available using this endpoint. This method requires an access token with RWD (read, write & direct message) permissions.',
      parameters: {
        required: [],
        optionnal: [
          'since_id',
          'max_id',
          'count',
          'include_entities',
          'skip_status'
        ]
      }
    },
    {
      method: 'post',
      url: 'direct_messages/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'direct_messages/new',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'friendships/no_retweets/ids',
      description: 'Returns a collection of user_ids that the currently authenticated user does not want to receive retweets from.',
      parameters: {
        required: [],
        optionnal: [
          'stringify_ids'
        ]
      }
    },
    {
      method: 'get',
      url: 'friends/ids',
      description: 'Returns a cursored collection of user IDs for every user the specified user is following (otherwise known as their “friends”). Either a screen_name or a user_id must be provided.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'cursor',
          'stringify_ids',
          'count'
        ]
      }
    },
    {
      method: 'get',
      url: 'followers/ids',
      description: 'Returns a cursored collection of user IDs for every user following the specified user. Either a screen_name or a user_id must be provided.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'cursor',
          'stringify_ids',
          'count'
        ]
      }
    },
    {
      method: 'get',
      url: 'friendships/incoming',
      description: 'Returns a collection of numeric IDs for every user who has a pending request to follow the authenticating user.',
      parameters: {
        required: [],
        optionnal: [
          'cursor',
          'stringify_ids'
        ]
      }
    },
    {
      method: 'get',
      url: 'friendships/outgoing',
      description: 'Returns a collection of numeric IDs for every protected user for whom the authenticating user has a pending follow request.',
      parameters: {
        required: [],
        optionnal: [
          'cursor',
          'stringify_ids'
        ]
      }
    },
    {
      method: 'post',
      url: 'friendships/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'friendships/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'friendships/update',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'friendships/show',
      description: 'Returns detailed information about the relationship between two arbitrary users. At least one source and one target, whether specified by IDs or screen_names, should be provided to this method.',
      parameters: {
        required: [
          'source_id',
          'source_screen_name',
          'target_id',
          'target_screen_name'
        ],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'friends/list',
      description: 'Returns a cursored collection of user objects for every user the specified user is following (otherwise known as their “friends”). Either a screen_name or a user_id should be provided.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'cursor',
          'count',
          'skip_status',
          'include_user_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'followers/list',
      description: 'Returns a cursored collection of user objects for users following the specified user. Either a screen_name or a user_id should be provided.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'cursor',
          'count',
          'skip_status',
          'include_user_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'friendships/lookup',
      description: 'Returns the relationships of the authenticating user to the comma-separated list of up to 100 screen_names or user_ids provided.',
      parameters: {
        required: [
          {
            name: 'user_id',
            type: 'string',
            description: 'a comma separated list of user IDs, up to 100 are allowed in a single request'
          },
          {
            name: 'screen_name',
            type: 'string',
            description: 'a comma separated list of screen names, up to 100 are allowed in a single request'
          }
        ],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'account/settings',
      description: 'Returns settings (including current trend, geo and sleep time information) for the authenticating user.',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'account/verify_credentials',
      description: 'Returns an HTTP 200 OK response code and a representation of the requesting user if authentication was successful; returns a 401 status code and an error message if not. Use this method to test if supplied user credentials are valid.',
      parameters: {
        required: [],
        optionnal: [
          'include_entities',
          'skip_status',
          'include_email'
        ]
      }
    },
    {
      method: 'post',
      url: 'account/settings',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'account/update_delivery_device',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'account/update_profile',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'account/update_profile_background_image',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'account/update_profile_image',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'blocks/list',
      description: 'Returns a collection of user objects that the authenticating user is blocking.',
      parameters: {
        required: [],
        optionnal: [
          'include_entities',
          'skip_status',
          'cursor'
        ]
      }
    },
    {
      method: 'get',
      url: 'blocks/ids',
      description: 'Returns an array of numeric user ids the authenticating user is blocking.',
      parameters: {
        required: [],
        optionnal: [
          'stringify_ids',
          'cursor'
        ]
      }
    },
    {
      method: 'post',
      url: 'blocks/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'blocks/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'users/lookup',
      description: 'Returns fully-hydrated user objects for up to 100 users per request, as specified by comma-separated values passed to the user_id and/or screen_name parameters.',
      parameters: {
        required: [
          {
            name: 'user_id',
            type: 'string',
            description: 'a comma separated list of user IDs, up to 100 are allowed in a single request'
          },
          {
            name: 'screen_name',
            type: 'string',
            description: 'a comma separated list of screen names, up to 100 are allowed in a single request'
          }
        ],
        optionnal: [
          'include_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'users/show',
      description: 'Returns a variety of information about the user specified by the required user_id OR screen_name parameter. The author’s most recent Tweet will be returned inline when possible.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: [
          'include_entities'
        ]
      }
    },
    {
      method: 'get',
      url: 'users/search',
      description: 'Provides a simple, relevance-based search interface to public user accounts on Twitter',
      parameters: {
        required: [
          'q'
        ],
        optionnal: [
          'page',
          'count',
          'include_entities'
        ]
      }
    },
    {
      method: 'post',
      url: 'account/remove_profile_banner',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'account/update_profile_banner',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'users/profile_banner',
      description: 'Returns a map of the available size variations of the specified user’s profile banner. If the user has not uploaded a profile banner, a HTTP 404 will be served instead. Always specify either an user_id or screen_name when requesting this method.',
      parameters: {
        required: [
          'user_id',
          'screen_name'
        ],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'mutes/users/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'mutes/users/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'mutes/users/ids',
      description: 'Returns an array of numeric user ids the authenticating user has muted.',
      parameters: {
        required: [],
        optionnal: [
          'cursor'
        ]
      }
    },
    {
      method: 'get',
      url: 'mutes/users/list',
      description: 'Returns an array of user objects the authenticating user has muted.',
      parameters: {
        required: [],
        optionnal: [
          'cursor',
          'include_entities',
          'skip_status'
        ]
      }
    },
    {
      method: 'get',
      url: 'users/suggestions/:slug',
      description: 'Access the users in a given category of the Twitter suggested user list.',
      parameters: {
        required: [
          'slug'
        ],
        optionnal: [
          {
            name: 'lang',
            type: 'string',
            description: 'suggested categories to the requested language, given by an ISO 639-1 code'
          },
        ]
      }
    },
    {
      method: 'get',
      url: 'users/suggestions',
      description: 'Access to Twitter’s suggested user list.',
      parameters: {
        required: [],
        optionnal: [
          {
            name: 'lang',
            type: 'string',
            description: 'suggested categories to the requested language, given by an ISO 639-1 code'
          }
        ]
      }
    },
    {
      method: 'get',
      url: 'users/suggestions/:slug/members',
      description: 'Access the users in a given category of the Twitter suggested user list and return their most recent status if they are not a protected user.',
      parameters: {
        required: [
          'slug'
        ],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'favorites/list',
      description: 'Returns the 20 most recent Tweets liked by the authenticating or specified user. If you do not provide either a user_id or screen_name to this method, it will assume you are requesting on behalf of the authenticating user.',
      parameters: {
        required: [],
        optionnal: [
          'user_id',
          'screen_name',
          'count',
          'since_id',
          'max_id',
          'include_entities'
        ]
      }
    },
    {
      method: 'post',
      url: 'favorites/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'favorites/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/list',
      description: 'Returns all lists the authenticating or specified user subscribes to, including their own. The user is specified using the user_id or screen_name parameters. If no user is given, the authenticating user is used.',
      parameters: {
        required: [],
        optionnal: [
          'user_id',
          'screen_name',
          'reverse'
        ]
      }
    },
    {
      method: 'get',
      url: 'lists/statuses',
      description: 'Returns a timeline of tweets authored by members of the specified list. Retweets are included by default. Either a list_id or a slug is required. If providing a list_slug, an ',
      parameters: {
        required: [
          'list_id',
          'slug'
        ],
        optionnal: [
          'owner_screen_name',
          'owner_id',
          'since_id',
          'max_id',
          'count',
          'include_entities',
          'include_rts'
        ]
      }
    },
    {
      method: 'post',
      url: 'lists/members/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/memberships',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/subscribers',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/subscribers/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/subscribers/show',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/subscribers/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/members/create_all',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/members/show',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/members',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/members/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/destroy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/update',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/show',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/subscriptions',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'lists/members/destroy_all',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'lists/ownerships',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'saved_searches/list',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'saved_searches/show/:id',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'saved_searches/create',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'saved_searches/destroy/:id',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'geo/id/:place_id',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'geo/reverse_geocode',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'geo/search',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'geo/place',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'trends/place',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'trends/available',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'application/rate_limit_status',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'help/configuration',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'help/languages',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'help/privacy',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'help/tos',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'get',
      url: 'trends/closest',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    },
    {
      method: 'post',
      url: 'users/report_spam',
      description: '',
      parameters: {
        required: [],
        optionnal: []
      }
    }
  ],
  parameters:[
    {
      name: 'count',
      type: 'int',
      description: 'count tweets'
    },
    {
      name: 'since_id',
      type: 'int',
      description: 'return result greater than this id'
    },
    {
      name: 'max_id',
      type: 'int',
      description: 'return result less than this id'
    },
    {
      name: 'trim_user',
      type: 'bool',
      description: 'set to true for having just user id'
    },
    {
      name: 'contributor_details',
      type: 'bool',
      description: 'enhance contributors'
    },
    {
      name: 'include_entities',
      type: 'bool',
      description: 'include entities'
    },
    {
      name: 'exclude_replies',
      type: 'bool',
      description: 'exclude replies'
    },
    {
      name: 'include_rts',
      type: 'bool',
      description: 'include reweets'
    },
    {
      name: 'user_id',
      type: 'string',
      description: 'the user id'
    },
    {
      name: 'screen_name',
      type: 'string',
      description: 'screen name of the user'
    },
    {
      name: 'include_user_entities',
      type: 'bool',
      description: 'include user entities'
    },
    {
      name: 'include_my_retweet',
      type: 'bool',
      description: 'include an additional current_user_retweet node'
    },
    {
      name: 'stringify_ids',
      type: 'bool',
      description: 'return id in string instead of 64bits integer'
    },
    {
      name: 'map',
      type: 'bool',
      description: 'tweets that do not exist or cannot be viewed by the current user'
    },
    {
      name: 'page',
      type: 'int',
      description: 'the page of results to retrieve'
    },
    {
      name: 'q',
      type: 'string',
      description: 'a UTF-8, URL-encoded search query of 500 characters maximum, including operators'
    },
    {
      name: 'geocode',
      type: 'string',
      description: 'returns tweets by users located within a given radius of the given latitude/longitude. (37.781157,-122.398720,1mi)'
    },
    {
      name: 'until',
      type: 'string',
      description: 'returns tweets created before the given date formatted as YYYY-MM-DD'
    },
    {
      name: 'result_type',
      type: 'string',
      description: 'type of search results you would prefer to receive: mixed (popular and realtime), recent (realtime), popular (popular)'
    },
    {
      name: 'skip_status',
      type: 'bool',
      description: 'statuses will not be included'
    },
    {
      name: 'cursor',
      type: 'int',
      description: 'useful for pagination (not povided is first page)'
    },
    {
      name: 'source_id',
      type: 'int',
      description: 'user_id of the subject user'
    },
    {
      name: 'source_screen_name',
      type: 'string',
      description: 'screen_name of the subject user'
    },
    {
      name: 'target_id',
      type: 'int',
      description: 'user_id of the target user'
    },
    {
      name: 'target_screen_name',
      type: 'string',
      description: 'screen_name of the target user'
    },
    {
      name: 'include_email',
      type: 'bool',
      description: 'use of this parameter requires whitelisting: email will be returned in the user objects as a string. If the user does not have an email address on their account, or if the email address is un-verified, null will be returned'
    },
    {
      name: 'slug',
      type: 'string',
      description: 'short name of list or a category'
    },
    {
      name: 'reverse',
      type: 'string',
      description: 'returns owned lists first'
    }
  ]
};

global.api = api;
