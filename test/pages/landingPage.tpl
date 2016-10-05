{{#articles}}
    <div>
        {{> components/artilcePuff}}
        <h2>{{heading}}</h2>
        <img src="{{imgUrl}}" />
        <p>
            {{body}}
        </p>
    </div>
{{/articles}}