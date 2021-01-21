import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import FilmItems from './FimItems'
import { getfilm } from '../API/TMDB'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.textSearch = ''
        this.page = 0 //compteur pour connaiter la page courent
        this.pageTotal = 0 // compteur pour connaitre le nbr total de page
        this.state = {
            films: [],
            isloading: false
        }
    }
    _onLoadFilm() {
        console.log(this.textSearch)
        if (this.textSearch.length > 0) {
            this.setState({ isloading: true }) //lancement de chargement
            getfilm(this.textSearch, this.page + 1)
                .then(
                    (data) => {
                        this.page = data.page
                        this.pageTotal = data.total_pages
                        this.setState({
                            films: [...this.state.films, ...data.results],
                            isloading: false
                        })
                    }
                )
        }

    }
    _searchInputText(text) {
        this.textSearch = text
    }
    _OnPagination() {
        console.log('OnReachedEnd')
        if (this.page < this.pageTotal) {
            this._onLoadFilm()
        }

    }
    _searchFilm() {
        this.page = 0
        this.pageTotal = 0
        this.setState({
            films: []
        }, () => {
            console.log("page" + this.page + "totalPage" + this.pageTotal + "les films" + this.state.films.length)
            this._onLoadFilm()
        })
    }
    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
    }
    // _ondisplayLoading() {
    //     if (this.state.isloading) {
    //         return (
    //             <View style={styles.loading_container}>
    //                 <ActivityIndicator size='large' />
    //                 {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
    //             </View>)
    //     }
    // }

    render() {
        console.log(this.props)
        console.log(this.state.isloading)
        return (
            <View style={styles.main_container}>
                <TextInput
                    placeholder="chercher un film"
                    style={styles.textinput}
                    onChangeText={(text) => this._searchInputText(text)}
                    onSubmitEditing={() => this._searchFilm()}
                />
                <Button
                    title="chercher"
                    onPress={() => this._searchFilm()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <FilmItems film={item}
                            displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => this._OnPagination()}


                />
                {
                    this.state.isloading ?
                        (<View style={styles.loading_container}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>)
                        : null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Search