(function() {
  define(function(require) {
    return [
      {
        title: 'Initialialization',
        syntax: 'Recoil.init( :scope )',
        args: [
          {
            name: ':scope',
            html: 'The initial scope of your application.'
          }
        ]
      }, {
        title: 'Transitions',
        syntax: 'Recoil.createTransition( :type, :viewName, :function )',
        args: [
          {
            name: ':type',
            html: 'A string that represents the type of transition. <i>Options: [ intro, outro ]</i>.'
          }, {
            name: ':viewName',
            html: 'The name(s) of the view(s) that this transition will be applied to.'
          }, {
            name: ':function',
            html: 'A function that performs the transitional tasks.'
          }
        ],
        p: ['<b>Purpose</b>: Transitions allow you to add custom animations when introducing new views or removing views.']
      }, {
        title: 'View Path',
        syntax: 'Recoil.setViewPath( :path )',
        args: [
          {
            name: ':path',
            html: 'The base path where your views are located.'
          }
        ]
      }, {
        title: 'Update Throttling',
        syntax: 'Recoil.setMaxUpdateFrequency( :frequency )',
        args: [
          {
            name: ':frequency',
            html: 'The maximum frequency that the global update method will be allowed to run. <i>Default: 50ms</i>.'
          }
        ],
        p: ['<b>Purpose</b>: This is to prevent frequent data changes from slowing your app down, triggered by rapid user interactions.', '<b>Note</b>: Just to eliminate any confusion, Recoil does <b>not</b> rely on any sort of interval-based checks.']
      }
    ];
  });

}).call(this);
