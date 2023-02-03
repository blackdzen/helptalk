import ICommentator from "../Interfaces/ICommentator"

const commentator: ICommentator = {
  commentTypes: new Set(['departure', 'close']),

  departureCommentParts: new Map([
    // ['fault', {
    //   title: 'Тема выезда:',
    //   value: '',
    // }],
    ['requestSubject', {
      title: 'Причина обращения:',
      value: '',
    }],
    ['operatorComment', {
      title: 'Комментарий к заявке:',
      value: '',
    }],
    ['sels', {
      title: 'CЭЛС:',
      value: '',
    }],
    ['call', {
      title: 'Требуется набрать клиента перед выездом:',
      value: '',
    }],
    ['organize', {
      title: 'Примечание:',
      value: '',
    }],
  ]),

  closeCommentParts: new Map([
    ['requestSubject', {
      title: 'Причина обращения:',
      value: '',
    }],
    ['mainDevice', {
      title: 'Основное устройство: ',
      value: '',
    }],
    // ['optionalDevice', {
    //   title: 'Дополнительное устройство: ',
    //   value: '',
    // }],
    ['stb', {
      title: 'STB: ',
      value: '',
    }],
    ['sms', {
      title: 'Информация об смс предоставлена: ',
      value: '',
    }],
    ['operatorComment', {
      title: 'Комментарий к заявке:',
      value: '',
    }],
    ['optionalService', {
      title: 'Смежный сервис: ',
      value: '',
    }],
  ]),

  setParts(commentType: string, pairs: Array<[string, string]>) {
    try {
      const parts = this.getCommentParts(commentType)
      pairs.forEach(pair => {
        let [key, value] = pair
        const part = parts.get(key)
        if (part) {
          const { title } = part
          parts.set(key, { title: title, value: value })
        } else {
          throw new Error(`Invalid key. Key is "${key}" and it is not found in "commentator.parts" map.`)
        }
      })
    } catch (error) {
      console.log(error)
    }
  },

  getComment(commentType: string) {
    let comment = ``
    try {
      const parts = this.getCommentParts(commentType)
      if (commentType === 'departure') {
        if (parts.get('operatorComment')) {
          // const operatorComment: { title: string, value: string } = { title: '', value: '' }
          // Object.assign(operatorComment, parts.get('operatorComment'))
          // operatorComment.value = `${parts.get('requestSubject')?.value} ${operatorComment.value}`
          // parts.set('operatorComment', operatorComment)
          let note: string = 'Примечание: '
          for (const key of parts.keys()) {
            if (key === 'requestSubject') {
              comment += `Тема выезда: ${parts.get(key)?.value} \n`
            } else if (key === 'sels' || key === 'call' || key === 'organize') {
              note += parts.get(key)?.value + ' '
            } else {
              comment += `${parts.get(key)?.title} ${parts.get(key)?.value} \n`
            }
          }
          if (note.length > 17) comment += note
        }
      } else {
        for (const partsValue of parts.values()) {
          comment += `${partsValue.title} ${partsValue.value}\n`
        }
      }
    } catch (error) {
      console.log(error)
    }
    return comment
  },

  getCommentParts(commentType: string) {
    if (!this.commentTypes.has(commentType)) {
      throw new Error(`Invalid commentType. commentType is "${commentType}", but it has to be "departure" or "close" only`)
    } else {
      const parts = commentType === 'departure' ? this.departureCommentParts : this.closeCommentParts
      return parts
    }
  },
}

export default commentator
