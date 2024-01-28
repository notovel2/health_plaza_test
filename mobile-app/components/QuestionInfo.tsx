import { Choice, Question } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native';

interface Props {
    question: Question;
    onAnswer: (choiceId: number) => void;
}

const QuestionInfo = (props: Props) => {
    const [choices, setChoices] = useState<Choice[]>([]);

    useEffect(() => {
        const c = [...props.question.choices];
        c.sort(() => Math.random() - 0.5);
        setChoices(c);
    }, [props.question]);

    return (
        <View>
            <Text>{props.question?.title}</Text>
            {choices.map((choice) => (
                <Button
                    onPress={() => props.onAnswer(choice.id)}
                    title={choice?.title}
                />
            ))}
        </View>
    );
};

export default QuestionInfo;
