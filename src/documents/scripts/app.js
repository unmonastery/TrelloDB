
var router = new (Backbone.Router.extend())

var Profile = Backbone.Model.extend();

var ProfileList = Backbone.Collection.extend({
    model: Profile,
    url: '/data/participants.json'
});

// api.trello.com/1/boards/54bfcd2f0c60b21168bb98a2?key=31eb16d37ff9dea5bf8ec1b33e438a55&token=d46662643c552f32fde430f8f0f7105061ec9d55af458f0afa710e669a2be804&lists?cards=open&attachment_fields=name,url

var ProfileView = Backbone.View.extend({
    el: "#profiles",
    template: _.template($('#profileTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection,"add", this.renderItem);          
    },
    render: function () {
        this.collection.each(function(model){
             var profileTemplate = this.template(model.toJSON());
             this.$el.append(profileTemplate);
        }, this);        
        return this;
    },
    renderItem: function(profile) {
         var profileTemplate = this.template(profile.toJSON());
         this.$el.append(profileTemplate);        
    }
});

var ModalView = Backbone.View.extend({
    el: "#modals",
    template: _.template($('#participantModalTpl').html()),
    initialize: function(){
        this.listenTo(this.collection,"add", this.renderItem);          
    },
    render: function () {
        this.collection.each(function(model){
             var profileTemplate = this.template(model.toJSON());
             this.$el.append(profileTemplate);
        }, this);        
        return this;
    },
    renderItem: function(profile) {
         var profileTemplate = this.template(profile.toJSON());
         this.$el.append(profileTemplate);        
    }
});

var profileList = new ProfileList(); //startData);
var modalList = new ProfileList(); //startData);


profileList.fetch(); /*({
  success: function(){
    //renderCollection(); // some callback to do stuff with the collection you made
  },
  error: function(){
  }
});

/*Trello.get("boards/54b56f71886fcc7bdc058779/lists?cards=open&attachment_fields=name,url", function(lists) {
  $.each(lists, function(ix, list) {
    // Create chapter section 
    var model = new Profile();
    model.name = card.name;
    profileList.add(model);
  }
}*/

var profilesView = new ProfileView({ collection: profileList });
profilesView.render();


modalList.fetch({
  success: function(){
    var profilesView = new ModalView({ collection: modalList });
    profilesView.render();
    //renderCollection(); // some callback to do stuff with the collection you made
  },
  error: function(){
  }
});

//var profilesView = new ProfileView({ collection: profileList });
//profilesView.render();
//profileList.add(addData);