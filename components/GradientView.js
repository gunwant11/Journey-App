
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';


const GradientView = ({ style, children }) => {

    return (
        <LinearGradient
            colors={['#f0d9d3', '#d4d2df']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.7, y: 1 }}
        >
            <View style={style} >
                {children}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

export default GradientView;
