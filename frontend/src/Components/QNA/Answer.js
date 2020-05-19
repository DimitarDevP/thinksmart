import React from 'react'


class Answer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            strings: [],
            stringTypes: [],
        }
    }

    updatePreview = (e) => {
        var updatedBody = this.props.body
        updatedBody = updatedBody.replace(/\?\?\?/g, " ‏‏‎ ")
        const saveStrings = []
        const stringTypes = []
        const strings = updatedBody.split("'''")
        var stc = 0
        for(let i = 0; i < updatedBody.length; i++){
            if(updatedBody[i] === "'" && updatedBody[i+1] === "'" && updatedBody[i+2] === "'"){
                for(let j = i+4; j < updatedBody.length; j++){
                    if(updatedBody[j+1] === "'" && updatedBody[j+2] === "'" && updatedBody[j+3] === "'"){
                        stringTypes[stc] = 'code'
                        stc++
                        i = j+4
                        break
                    }
                }
            }else {
                if((updatedBody[i+1] === "'" && updatedBody[i+2] === "'" && updatedBody[i+3] === "'")){
                    stringTypes[stc] = 'text'
                    stc++
                }
            }
        }

        if(stringTypes.length < strings.length){
            stringTypes[stringTypes.length] = 'text'
        }

        for(let i = 0; i < strings.length; i++){
            const className = stringTypes[i]
            const text = strings[i].split('\n')
            let element = (
                text.map(txt => {
                    return (
                        <p className={className}>{txt}</p>
                    )
                })
            )

            saveStrings.push(element)

        }

        this.setState({
            strings: saveStrings
        })
    }

    componentDidMount() {
        this.updatePreview()
    }

    render(){
        return(
            <div className="add-question-container">
                <div className="preview-question">
                    {this.state.strings}
                </div>
            </div>
        )
    }

}

export default Answer