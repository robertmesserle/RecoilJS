(function() {
  define(function(require) {
    return [
      {
        title: 'Creating a Model',
        syntax: "SampleModel = new Recoil.Model( {\n  $props : { ... },\n  $virtuals : { ... },\n  $subscribe : { ... },\n  $validate : { ... }\n} )",
        args: [
          {
            name: '$props',
            html: 'A hash of properties on your model.'
          }, {
            name: '$virtuals',
            html: 'A hash of virtual properties on your model.'
          }, {
            name: '$subscribe',
            html: 'A hash of subscribe methods.'
          }, {
            name: '$validate',
            html: 'A hash of validation methods.'
          }
        ]
      }, {
        title: '$props',
        syntax: "$props: {\n  :propName : {\n    type : :type\n    default : :default\n  }\n}",
        args: [
          {
            name: ':propName',
            html: 'A name used to identify a property.'
          }, {
            name: ':type',
            html: 'A native JavaScript type that defines the type of data expected.'
          }, {
            name: ':default',
            html: 'The default value for a property.'
          }
        ]
      }, {
        title: '$virtuals',
        syntax: "$virtuals: {\n  :propName : {\n    read: :readMethod,\n    write: :writeMethod\n  }\n}",
        args: [
          {
            name: ':propName',
            html: 'A name used to identify a property.'
          }, {
            name: ':readMethod',
            html: 'A method used to calculate the value of a virtual property.'
          }, {
            name: ':writeMethod',
            html: 'A method used to parse the value written to a virtual property.'
          }
        ]
      }, {
        title: '$subscribe',
        syntax: "$subscribe: {\n  :propName : :subscribeMethod\n}",
        args: [
          {
            name: ':propName',
            html: 'A name used to identify a property.'
          }, {
            name: ':subscribeMethod',
            html: 'A method to be run when the specified property changes.'
          }
        ]
      }, {
        title: '$validate',
        syntax: "$validate: {\n  :propName : :validationMethod\n}",
        args: [
          {
            name: ':propName',
            html: 'A name used to identify a property.'
          }, {
            name: ':validationMethod',
            html: 'A method that is run to determine if a property value is valid.'
          }
        ]
      }
    ];
  });

}).call(this);
